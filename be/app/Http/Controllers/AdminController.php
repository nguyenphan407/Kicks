<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Laravel\Prompts\select;

class AdminController extends Controller
{
    // Show all products
    public function index(Request $request) {
        if ($request->has('category')) {
            $product = Product::leftJoin('categories', 'products.category_id', '=', 'categories.category_id')
                ->leftJoin('order_items', 'products.product_id', '=', 'order_items.product_id')
                ->where('category_name', $request->category)
                ->select(
                    'products.product_id', 
                    'products.name', 
                    'products.stock_quantity', 
                    'products.price', 
                    'products.regular_price', 
                    'products.description', 
                    'categories.category_name', 
                    DB::raw('SUM(COALESCE(order_items.quantity, 0)) as sale')
                )
                ->groupBy(
                    'products.product_id', 
                    'products.name', 
                    'products.stock_quantity', 
                    'products.price', 
                    'products.regular_price',
                    'products.description', 
                    'categories.category_name'
                )
                ->with('images')
                ->paginate(12);

            return response()->json($product);
        }
        else {
            $product = Product::leftJoin('categories', 'products.category_id', '=', 'categories.category_id')
                ->leftJoin('order_items', 'products.product_id', '=', 'order_items.product_id')
                ->select(
                    'products.product_id', 
                    'products.name', 
                    'products.stock_quantity', 
                    'products.price',
                    'products.regular_price', 
                    'products.description', 
                    'categories.category_name', 
                    DB::raw('SUM(COALESCE(order_items.quantity, 0)) as sale')
                )
                ->groupBy(
                    'products.product_id', 
                    'products.name', 
                    'products.stock_quantity', 
                    'products.price', 
                    'products.regular_price',
                    'products.description', 
                    'categories.category_name'
                )
                ->with('images')
                ->paginate(12);
    
            return response()->json($product);
            // return response()->json($this->formatProduct($product->toArray()));
        }
    }

    // Get quantity for each category
    public function getQuantityOfCategory() {
        $result = Category::select('categories.category_id', 'categories.category_name', DB::raw('count(products.product_id) as quantity'))
                            ->leftJoin('products', 'products.category_id', '=', 'categories.category_id')
                            ->groupBy('categories.category_id', 'categories.category_name')
                            ->get();

        return response()->json($result);
    }

    public function getOrderInfo($id)
    {
        // Lấy dữ liệu đơn hàng và các thông tin liên quan
        $rawData = Order::where('orders.order_id', $id)
            ->join('users', 'users.user_id', '=', 'orders.user_id')
            ->leftJoin('payments', 'payments.order_id', '=', 'orders.order_id')
            ->join('order_items', 'order_items.order_id', '=', 'orders.order_id')
            ->join('product_size', 'product_size.product_size_id', '=' , 'order_items.product_size_id')
            ->join('products', 'products.product_id', '=', 'product_size.product_id')
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
                'users.first_name',
                'users.last_name',
                'users.email',
                'users.phone_number',
                'users.avatar',
                'users.role',
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
                'payments.payment_method',
                'payments.bank_id',
                'payments.account_name',
                'payments.account_number',
                'payments.description as payment_desc',
                'payments.reference'
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
                    'customer' => [
                        'first_name' => $item->first_name,
                        'last_name' => $item->last_name,
                        'email' => $item->email,
                        'phone_number' => $item->phone_number,
                        'avatar' => $item->avatar,
                        'role' => $item->role,
                    ],
                    'payment' => [
                        'payment_method' => $item->payment_method,
                        'bank_id' => $item->bank_id,
                        'account_name' => $item->account_name,
                        'account_number' => $item->account_number,
                        'description' => $item->payment_desc,
                        'reference' => $item->reference
                    ], 
                    'order_items' => []
                ];
            }

            // Thêm thông tin sản phẩm vào danh sách order_items
            $result[$orderId]['order_items'][] = [
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
            ];
        }

        // Chuyển kết quả về dạng mảng tuần tự
        $finalResult = array_values($result);

        // Trả về kết quả dưới dạng JSON
        return response()->json($finalResult);
    }

    // statics graph
    public function statics(Request $request){
        $result = Order::select(DB::raw($request->metric.'(created_at) as ' . $request->metric), DB::raw('sum(amount) as revenue'))
            ->groupBy(DB::raw($request->metric.'(created_at)'))
            ->get();

        return response()->json($result);
    }

    public function report(Request $request){
        $nowTotal = Order::select(DB::raw('sum(amount) as total_revenue'))
            ->whereDate('created_at', '<', new DateTime($request->toDate))
            ->WhereDate('created_at', '>', new DateTime($request->fromDate))
            ->first();

        $nowShipping = Order::select(DB::raw('sum(amount) as ship_revenue'))
            ->whereDate('created_at', '<', new DateTime($request->toDate))
            ->WhereDate('created_at', '>', new DateTime($request->fromDate))
            ->where('order_status', '=', 'shipped')
            ->first();

        $nowActive = Order::select(DB::raw('sum(amount) as active_revenue'))
            ->whereDate('created_at', '<', new DateTime($request->toDate))
            ->WhereDate('created_at', '>', new DateTime($request->fromDate))
            ->where('order_status', '=', 'delivered')
            ->first();
        
        $pastTotal = Order::select(DB::raw('sum(amount) as total_revenue'))
            ->whereDate('created_at', '<', (new DateTime($request->toDate))->modify('-1 year'))
            ->WhereDate('created_at', '>', (new DateTime($request->fromDate))->modify('-1 year'))
            ->first();

        $pastShipping = Order::select(DB::raw('sum(amount) as ship_revenue'))
            ->whereDate('created_at', '<', (new DateTime($request->toDate))->modify('-1 year'))
            ->WhereDate('created_at', '>', (new DateTime($request->fromDate))->modify('-1 year'))
            ->where('order_status', '=', 'shipped')
            ->first();
        
        $pastActive = Order::select(DB::raw('sum(amount) as active_revenue'))
            ->whereDate('created_at', '<', (new DateTime($request->toDate))->modify('-1 year'))
            ->WhereDate('created_at', '>', (new DateTime($request->fromDate))->modify('-1 year'))
            ->where('order_status', '=', 'delivered')
            ->first();


        return response()->json([
            'now' => [$nowTotal->total_revenue, $nowActive->active_revenue, $nowShipping->ship_revenue],
            'past' => [$pastTotal->total_revenue, $pastActive->active_revenue, $pastShipping->ship_revenue],
            'percent' => [
                ($nowTotal->total_revenue/($pastTotal->total_revenue || 1) - 1),
                ($nowActive->active_revenue/($pastActive->active_revenue || 1) - 1),
                ($nowShipping->ship_revenue/($pastShipping->ship_revenue || 1) - 1),
            ]
        ]);
    }

}
