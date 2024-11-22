<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
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
                    'products.description', 
                    'categories.category_name', 
                    DB::raw('SUM(COALESCE(order_items.quantity, 0)) as sale')
                )
                ->groupBy(
                    'products.product_id', 
                    'products.name', 
                    'products.stock_quantity', 
                    'products.price', 
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
                    'products.description', 
                    'categories.category_name', 
                    DB::raw('SUM(COALESCE(order_items.quantity, 0)) as sale')
                )
                ->groupBy(
                    'products.product_id', 
                    'products.name', 
                    'products.stock_quantity', 
                    'products.price', 
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
            ->join('products', 'order_items.product_id', '=', 'products.product_id')
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
                'order_items.product_id',
                'order_items.quantity',
                'order_items.price',
                'products.name',
                'products.brand',
                'products.gender',
                'products.description',
                'products.stock_quantity',
                'products.color',
                'products.category_id',
                'payments.payment_method',
                'payments.bank_id',
                'payments.account_name',
                'payments.account_number',
                'payments.description',
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
                        'description' => $item->description,
                        'reference' => $item->reference
                    ], 
                    'order_items' => []
                ];
            }

            // Thêm thông tin sản phẩm vào danh sách order_items
            $result[$orderId]['order_items'][] = [
                'order_item_id' => $item->order_item_id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'name' => $item->name,
                'brand' => $item->brand,
                'gender' => $item->gender,
                'description' => $item->description,
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

}
