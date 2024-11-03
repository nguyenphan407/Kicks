<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index($orderId)
    {
        $orderItems = OrderItem::where('order_id', $orderId)->get();
        return response()->json($orderItems);
    }
}
