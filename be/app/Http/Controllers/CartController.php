<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
    
        $cartItems = Cart::where('user_id', $user->user_id)
        ->join('product_size', 'product_size.product_size_id', '=', 'carts.product_size_id')
        ->join('product_image', 'product_size.product_id', '=', 'product_image.product_id')
        ->join('products', 'products.product_id', '=', 'product_size.product_id')
        ->select('carts.cart_id', 
            'carts.user_id',
            'products.name',
            'products.description', 
            'carts.product_size_id',
            'product_size.size',
            'products.price', 
            'carts.quantity', 
            DB::raw('MIN(product_image.image) as image'))
        ->groupBy('carts.cart_id', 'carts.user_id', 'products.name', 'products.price', 'products.description','product_size.size', 'carts.product_size_id', 'carts.quantity')
        ->get();
        return response()->json($cartItems);
    }

    public function add(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $product_size = ProductSize::where('product_id', $request->product_id)
            ->where('size', $request->size)
            ->first();

       
        if ($cartItem = Cart::where('user_id', $user->user_id)
        ->where('product_size_id',  $product_size->product_size_id)->first()){
            $cartItem->quantity = $cartItem->quantity + $request->quantity;
            $cartItem->save();
        }
        else {
            $cartItem = Cart::Create(
                [
                    'user_id' => $user->user_id,
                    'product_size_id' => $product_size->product_size_id,
                    'quantity' =>  $request->quantity
                ]
            );
        }

        return response()->json(['message' => 'Product added to cart', 'cartItem' => $cartItem]);
    }

    public function update(Request $request, $id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->update(['quantity' => $request->quantity]);
        return response()->json(['message' => 'Cart updated', 'cartItem' => $cartItem]);
    }

    public function remove($id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();
        return response()->json(['message' => 'Product removed from cart']);
    }

    public function clear()
    {
        $user = Auth::user();
        Cart::where('user_id', $user->user_id)->delete();
        return response()->json(['message' => 'Cart cleared']);
    }
}
