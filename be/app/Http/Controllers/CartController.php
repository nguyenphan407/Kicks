<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
    
        $cartItems = Cart::where('user_id', $user->user_id)->with('product')->get();
        return response()->json($cartItems);
    }

    public function add(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $cartItem = Cart::updateOrCreate(
            [
                'user_id' => $user->user_id,
                'product_id' => $request->product_id,
            ],
            [
                'quantity' => DB::raw("quantity + " . $request->quantity)
            ]
        );

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
        Cart::where('user_id', $user->id)->delete();
        return response()->json(['message' => 'Cart cleared']);
    }
}
