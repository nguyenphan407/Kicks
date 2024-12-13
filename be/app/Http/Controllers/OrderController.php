<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductSize;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        // if ($request->has('status')){
        //     $orders = Order::with('items')
        //         ->where('user_id', Auth::id())
        //         ->where('order_status', $request->status)
        //         ->get();
        // }
        // else {
        //     $orders = Order::with('items')->where('user_id', Auth::id())->get();
        // }
        
        // return response()->json($orders);

        // Lấy dữ liệu đơn hàng và các thông tin liên quan
        $rawData = Order::where('orders.user_id', Auth::id())
            ->where('orders.order_status', '=', $request->status)
            ->join('order_items', 'order_items.order_id', '=', 'orders.order_id')
            ->join('product_size', 'product_size.product_size_id', '=' , 'order_items.product_size_id')
            ->join('products', 'products.product_id', '=', 'product_size.product_id')
            ->join('product_image', 'product_image.product_id', '=', 'products.product_id')
            ->select(
                'orders.order_id',
                'orders.user_id',
                'orders.order_status',
                'orders.amount',
                'orders.shipping_address',
                'orders.payment_status',
                'orders.shipping',
                'orders.created_at',
                'orders.updated_at',
                'order_items.order_item_id',
                'order_items.product_size_id',
                'order_items.quantity',
                'order_items.price',
                'products.product_id',
                'products.name',
                'products.brand',
                'products.gender',
                'products.description as product_desc',
                'products.stock_quantity',
                'products.color',
                'products.category_id',
                'product_size.size',
                DB::raw('MIN(product_image.image) as image')
            )
            ->groupBy(
                'orders.order_id',
                'orders.user_id',
                'orders.order_status',
                'orders.amount',
                'orders.shipping_address',
                'orders.payment_status',
                'orders.shipping',
                'orders.created_at',
                'orders.updated_at',
                'order_items.order_item_id',
                'order_items.product_size_id',
                'order_items.quantity',
                'order_items.price',
                'products.product_id',
                'products.name',
                'products.brand',
                'products.gender',
                'products.description',
                'products.stock_quantity',
                'products.color',
                'products.category_id',
                'product_size.size',
            )
            ->get();

        // Xử lý dữ liệu để nhóm theo order_id
        $result = [];
        foreach ($rawData as $item) {
            $orderId = $item->order_id;

            if (!isset($result[$orderId])) {
                $result[$orderId] = [
                    'order_id' => $item->order_id,
                    'user_id' => $item->user_id,
                    'order_status' => $item->order_status,
                    'amount' => $item->amount,
                    'shipping_address' => $item->shipping_address,
                    'orders.shipping' => $item->shipping,
                    'payment_status' => $item->payment_status,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                    'items' => []
                ];
            }

            // Thêm thông tin sản phẩm vào danh sách order_items
            $result[$orderId]['items'][] = [
                'order_item_id' => $item->order_item_id,
                'product_id' => $item->product_id,
                'product_size_id' => $item->product_size_id,
                'size' => $item->size,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'name' => $item->name,
                'brand' => $item->brand,
                'gender' => $item->gender,
                'description' => $item->product_desc,
                'stock_quantity' => $item->stock_quantity,
                'color' => $item->color,
                'category_id' => $item->category_id,
                'product_image' => $item->image,
            ];
        }

        // Chuyển kết quả về dạng mảng tuần tự
        $finalResult = array_values($result);

        // Trả về kết quả dưới dạng JSON
        return response()->json($finalResult);
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

    public static function update(Request $request = null, $status = null, $orderCode = null){
        if($status){
            $order = Order::find($orderCode, 'order_id');

            $order->update(['payment_status' => $status]);

            if ($status == 'paid'){
                $cart = Cart::where('user_id', $order->first()->user_id);
                $cart->delete();
            }
        }
    }
}
