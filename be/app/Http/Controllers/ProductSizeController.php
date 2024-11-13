<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;

class ProductSizeController extends Controller
{
    //
    public function store(Request $request){
        $product = Product::where('name',$request->name)->get();
        if ($product){
            $product_id = $product[0]->product_id;
        }
        else return response()->json("Not found product");

        $product_size = ProductSize::create([
            'product_id' => $product_id,
            'size' => $request->size,
            'quantity' => $request->quantity,
        ]);

        return response()->json($product_size);
    }
}
