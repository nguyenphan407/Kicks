<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // 1. Hàm lấy danh sách tất cả danh mục
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // 2. Hàm lấy chi tiết một danh mục theo ID
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        return response()->json($category);
    }

    // 3. Hàm tạo một danh mục mới
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'category_name' => 'required|string|max:100',
        ]);

        $category = Category::create($validatedData);

        return response()->json($category, 201);
    }

    // 4. Hàm cập nhật một danh mục theo ID
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $validatedData = $request->validate([
            'category_name' => 'sometimes|string|max:100',
        ]);

        $category->update($validatedData);

        return response()->json($category);
    }

    // 5. Hàm xóa một danh mục theo ID
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
