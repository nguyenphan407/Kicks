<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->where('user_id', Auth::id())->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'user_id' => Auth::id(),
            'order_status' => 'pending',
            'amount' => $request->amount,
            'shipping_address' => $request->shipping_address,
            'payment_status' => 'pending',
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->order_id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json(['message' => 'Order created successfully', 'order' => $order]);
    }
}
