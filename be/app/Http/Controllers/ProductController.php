<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Cloudinary\Configuration\Configuration;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    //
    // 1. Lấy danh sách sản phẩm
    public function index()
    {
        // Sử dụng cache cho danh sách sản phẩm để tối ưu
        $products = Cache::remember('products_list', 60, function () {
            return Product::with(['images', 'sizes'])->paginate(10);
        });
        // Trả về JSON danh sách sản phẩm
        return response()->json($products);
    }

    // 2. Hiển thị chi tiết sản phẩm
    public function show($id)
    {
        $user = Auth::user();
        if ($user) {
            $userId = $user->user_id;
            // Theo dõi lượt xem sản phẩm cho người dùng
            Redis::zincrby("user:{$userId}:viewed_products", 1, $id);
        }
        // Tìm sản phẩm theo ID
        $product = Cache::remember("product_{$id}", 60, function () use ($id) {
            return Product::with(['images', 'sizes'])->find($id);
        });

        // Trả về chi tiết sản phẩm
        return $product ? response()->json($product) : response()->json(['error' => 'Product not found'], 404);
    }

    // 3. Tạo mới một sản phẩm
    public function store(Request $request)
    {
        // Validate dữ liệu gửi lên
        $validatedData = $request->validate([
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string',
            'gender'      => 'nullable|string',
            'price'       => 'required|numeric',
            'color'       => 'nullable|string|max:30',
            'category_id' => 'required|integer|exists:categories,category_id',
            'brand'       => 'nullable|string|max:50',
        ]);
        // Tạo sản phẩm mới
        $product = Product::create($validatedData);

        if ($request->filled(['size', 'quantity'])) {
            ProductSize::create([
                'product_id' => $product->product_id,
                'size' => $request->size,
                'quantity' => $request->quantity,
            ]);
        }

        if ($request->hasFile('images')) {
            $this->handleProductImages($request->file('images'), $product->product_id);
        }

        // Trả về sản phẩm mới tạo
        return response()->json($product, 201);
    }

    // 4. Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::findOrFail($id);

        // Nếu không tìm thấy sản phẩm
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Validate dữ liệu
        $validatedData = $request->validate([
            'name'        => 'sometimes|nullable|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'sometimes|nullable|numeric',
            'color'       => 'nullable|string|max:30',
            'category_id' => 'sometimes|nullable|integer|exists:categories,category_id',
            'brand'       => 'nullable|string|max:50',
        ]);

        // Cập nhật sản phẩm
        $product->update($validatedData);

        if ($request->filled(['size', 'quantity'])) {
            ProductSize::updateOrCreate(
                ['product_id' => $product->product_id, 'size' => $request->size],
                ['quantity' => $request->quantity]
            );
        }

        if ($request->hasFile('images')) {
            dispatch(function () use ($request, $id) {
                $this->handleProductImages($request->file('images'), $id, true);
            });
        }

        Cache::forget("product_{$id}");
        // Trả về sản phẩm sau khi cập nhật
        return response()->json($product);
    }

    // 5. Xóa sản phẩm
    public function destroy($id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::findOrFail($id);

        $this->deleteProductImages($product->product_id);
        $productSize = ProductSize::where("product_id", $id)->get();

        foreach ($productSize as $size) {
            $size->delete();
        }
        // Xóa sản phẩm
        $product->delete();
        // Trả về thông báo đã xóa
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function filter(Request $request)
    {
        // Bắt đầu với truy vấn cơ bản
        $query = Product::query();

        // Lọc theo tên sản phẩm (nếu có)
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        // Lọc theo danh mục (nếu có)
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        // Lọc theo khoảng giá (nếu có)
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->input('min_price'), $request->input('max_price')]);
        } elseif ($request->has('min_price')) {
            $query->where('price', '>=', $request->input('min_price'));
        } elseif ($request->has('max_price')) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        // Lọc theo màu sắc (nếu có)
        if ($request->has('color')) {
            $query->where('color', $request->input('color'));
        }

        // Lọc theo kích thước (nếu có)
        if ($request->has('size')) {
            $query->where('size', $request->input('size'));
        }

        // Lọc theo thương hiệu (nếu có)
        if ($request->has('brand')) {
            $query->where('brand', $request->input('brand'));
        }

        // Lọc theo số lượng tồn kho (nếu có)
        if ($request->has('stock_quantity')) {
            $query->where('stock_quantity', '>=', $request->input('stock_quantity'));
        }

        if ($request->has('sort')) {
            $query->orderBy($request->input('sort'), 'desc');
        }

        if ($request->has('limit')) {
            $query->limit($request->input('limit'));
        }

        // Lấy danh sách sản phẩm sau khi lọc
        $products = $query->get();

        // Trả về kết quả dưới dạng JSON
        return response()->json($products);

    }

    // Recommendation
    public function recommendedProducts()
    {
        $userId = Auth::user()->user_id;

        // Lấy top 5 sản phẩm người dùng đã xem nhiều nhất
        $viewedProducts = Redis::zrevrange("user:{$userId}:viewed_products", 0, 4);

        // Tìm các sản phẩm thuộc cùng danh mục với những sản phẩm đã xem
        $recommendedProducts = Product::whereIn('product_id', $viewedProducts)
                                    ->orWhereHas('category', function ($query) use ($viewedProducts) {
                                        $query->whereIn('product_id', function ($q) use ($viewedProducts) {
                                            $q->select('category_id')
                                                ->from('products')
                                                ->whereIn('product_id', $viewedProducts);
                                        });
                                    })
                                    ->take(5)
                                    ->get();

        return response()->json($recommendedProducts);
    }

    private function handleProductImages($images, $productId, $clearOldImages = false)
    {
        if ($clearOldImages) {
            $this->deleteProductImages($productId);
        }

        foreach ($images as $image) {
            ProductImageController::upload($image->getRealPath(), $productId);
        }
    }

    private function deleteProductImages($productId)
    {
        $images = ProductImage::where("product_id", $productId)->get();
        foreach ($images as $image) {
            ProductImageController::delete($image->public_id);
            $image->delete();
        }
    }
}
