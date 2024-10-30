<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    // 1. Lấy danh sách sản phẩm
    public function index()
    {
        // Lấy tất cả sản phẩm
        $products = Product::all();

        // Trả về JSON danh sách sản phẩm
        return response()->json($products);
    }

    // 2. Hiển thị chi tiết sản phẩm
    public function show($id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::find($id);

        // Nếu không tìm thấy sản phẩm
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Trả về chi tiết sản phẩm
        return response()->json($product);
    }

    // 3. Tạo mới một sản phẩm
    public function store(Request $request)
    {
        // Validate dữ liệu gửi lên
        $validatedData = $request->validate([
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'size'        => 'nullable|string|max:10',
            'color'       => 'nullable|string|max:30',
            'category_id' => 'required|integer|exists:categories,category_id',
            'brand'       => 'nullable|string|max:50',
            'image'       => 'nullable|string|max:255',
        ]);

        // Tạo sản phẩm mới
        $product = Product::create($validatedData);

        // Trả về sản phẩm mới tạo
        return response()->json($product, 201);
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
            'name'        => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'sometimes|required|numeric',
            'stock_quantity' => 'sometimes|required|integer',
            'size'        => 'nullable|string|max:10',
            'color'       => 'nullable|string|max:30',
            'category_id' => 'sometimes|required|integer|exists:categories,category_id',
            'brand'       => 'nullable|string|max:50',
            'image'       => 'nullable|string|max:255',
        ]);

        // Cập nhật sản phẩm
        $product->update($validatedData);

        // Trả về sản phẩm sau khi cập nhật
        return response()->json($product);
    }

    // 5. Xóa sản phẩm
    public function destroy($id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::find($id);

        // Nếu không tìm thấy sản phẩm
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
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

        // Lấy danh sách sản phẩm sau khi lọc
        $products = $query->get();

        // Trả về kết quả dưới dạng JSON
        return response()->json($products);

    }

}
