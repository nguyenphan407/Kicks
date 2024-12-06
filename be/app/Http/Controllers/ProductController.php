<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
use Spatie\Searchable\ModelSearchAspect;
use Spatie\Searchable\Search;

class ProductController extends Controller
{
    // Quân đã fix bugs ở đây
    // 1. Lấy danh sách sản phẩm
    public function index(Request $request)
    {
        // Lấy page từ request, mặc định là 1 nếu không có
        $page = $request->query('page', 1);
        // Lưu cache theo từng trang, sử dụng page trong key cache
        $cacheKey = "products_list_page_{$page}";
        $products = Cache::remember($cacheKey, 60, function () {
            return Product::with(['images', 'sizes'])->paginate(12);
        });

        // $results = [];

        // foreach ($products as $item){
        //     $results[] = $this->formatProduct($item->toArray());
        // }

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
        return $product ? response()->json($this->formatProduct($product->toArray())) : response()->json(['error' => 'Product not found'], 404);
    }

    // 3. Tạo mới một sản phẩm
    public function store(Request $request)
    {
        // Validate dữ liệu gửi lên
        $validatedData = $request->validate([
            'name'          => 'required|string|max:100',
            'description'   => 'nullable|string',
            'gender'        => 'nullable|string',
            'regular_price' => 'required|numeric',
            'price'         => 'required|numeric',
            'color'         => 'nullable|string|max:30',
            'category_id'   => 'required|integer|exists:categories,category_id',
            'brand'         => 'nullable|string|max:50',
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
        return response()->json($product);
    }

    // 4. Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::find($id);

        // Nếu không tìm thấy sản phẩm
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Validate dữ liệu
        $validatedData = $request->validate([
            'name'          => 'sometimes|nullable|string|max:100',
            'description'   => 'nullable|string',
            'gender'        => 'nullable|string',
            'regular_price' => 'nullable|numeric',
            'price'         => 'sometimes|nullable|numeric',
            'color'         => 'nullable|string|max:30',
            'category_id'   => 'sometimes|nullable|integer|exists:categories,category_id',
            'brand'         => 'nullable|string|max:50',
        ]);

        // Cập nhật sản phẩm
        $product->update($validatedData);

        if ($request->filled('sizes')) {
            $sizes = $request->sizes;
            if (!is_array($sizes)){
                $sizes = [$sizes];
            }

            foreach ($sizes as $size) {
                ProductSize::updateOrCreate(
                    ['product_id' => $product->product_id, 'size' => $size['size']],
                    ['quantity' => $size['quantity']]
                );
            };
        }

        if ($request->hasFile('images')) {
            $this->handleProductImages($request->file('images'), $id);
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

    //Lọc sản phẩm
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

    // Tìm kiếm sản phẩm
    public function search(Request $request) {
        $searchterm = $request->input('query');

        $searchResults = (new Search())
            ->registerModel(Product::class, ['name', 'description']) //apply search on field name and description
            //Config partial match or exactly match
            // ->registerModel(Category::class, function (ModelSearchAspect $modelSearchAspect) {
            //     $modelSearchAspect
            //         ->addExactSearchableAttribute('name'); // only return results that exactly match
            // })
            ->perform($searchterm);

        return response()->json($searchResults);
    }

    public function recentViewed(){
        $userId = Auth::user()->user_id;
        // Lấy danh sách ID sản phẩm đã xem nhiều nhất của người dùng
        $viewedProducts = Redis::zrevrange("user:{$userId}:viewed_products", 0, -1);

        return response()->json($viewedProducts);
    }
    // Recommendation
    public function recommendedProducts()
    {
        $userId = Auth::user()->user_id;

        // Lấy danh sách ID sản phẩm đã xem nhiều nhất của người dùng
        $viewedProducts = Redis::zrevrange("user:{$userId}:viewed_products", 0, -1);

        // Lấy danh mục của các sản phẩm đã xem
        $viewedCategories = Product::whereIn('product_id', $viewedProducts)
                                ->pluck('category_id')
                                ->unique();

        // Tìm các sản phẩm thuộc cùng danh mục nhưng không có trong danh sách đã xem
        $recommendedProducts = Product::whereIn('category_id', $viewedCategories)
                                    ->whereNotIn('product_id', $viewedProducts)
                                    ->take(5)
                                    ->get();

        return response()->json($recommendedProducts);
    }

    private function handleProductImages($images, $productId)
    {
        if (!is_array($images)){
            $images = [$images];
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
        }
    }
    public function formatProduct($product)
    {
        // Các trường cần xử lý và hàm callback tương ứng
        $fieldsToFormat = [
            'images' => function ($images) {
                return array_map(function ($image) {
                    return $image['image'];
                }, $images);
            },
            'sizes' => function ($sizes) {
                return array_map(function ($size) {
                    return [
                        'size' => $size['size'],
                        'stock' => $size['quantity'],
                    ];
                }, $sizes);
            },
        ];

        // Duyệt qua các trường cần xử lý và áp dụng callback nếu trường tồn tại
        foreach ($fieldsToFormat as $field => $callback) {
            if (isset($product[$field]) && is_array($product[$field])) {
                $product[$field] = $callback($product[$field]);
            }
        }

        return $product;
    }
}
