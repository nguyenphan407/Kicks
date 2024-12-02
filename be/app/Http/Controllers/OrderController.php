<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->where('user_id', Auth::id())->get();
        return response()->json($orders);
    }

    public static function store($data)
    {
        try {
            $order = Order::create([
                'order_id' => $data['orderCode'],
                'user_id' => $data['items'][0]['user_id'],
                'order_status' => 'pending',
                'amount' => $data['amount'] / 25000,
                'shipping_address' => $data['buyerAddress'],
                'payment_status' => 'pending',
                'shipping' => 'giao hang tiet kiem',
            ]);

            foreach ($data['items'] as $item) {
                $product_size = Product::where('name',$item['name'])
                    ->join('product_size', 'product_size.product_id', '=', 'products.product_id')
                    ->select('product_size.product_size_id')
                    ->first();

                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_size_id' => $product_size->product_size_id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
        } catch (Exception $e) {
            return response()->json($e);
        }

        return response()->json(['message' => 'Order created successfully', 'order' => $order]);
    }

    public static function update(Request $request){

    }
}
