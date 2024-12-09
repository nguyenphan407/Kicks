<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Searchable\ModelSearchAspect;
use Spatie\Searchable\Search;

use function Laravel\Prompts\select;

class AdminController extends Controller
{
    // Show all products
    public function index(Request $request) {
        if ($request->has('category')) {
            $product = Product::leftJoin('categories', 'products.category_id', '=', 'categories.category_id')
                ->join('product_size', 'product_size.product_id','=', 'products.product_id')
                ->leftJoin('order_items', 'product_size.product_size_id', '=', 'order_items.product_size_id')
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
                ->join('product_size', 'product_size.product_id','=', 'products.product_id')
                ->leftJoin('order_items', 'product_size.product_size_id', '=', 'order_items.product_size_id')
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

    public function search(Request $request) {
        $searchterm = $request->input('query');
    
        if (strtoupper(substr($searchterm, 0, 3)) == 'ORD') {
            // Nếu tìm kiếm là Order ID
            $formattedResults = Order::where('order_id', 'like', substr($searchterm, 3, strlen($searchterm)) . '%')->get();
        } else {
            // Nếu tìm kiếm là Product
            $searchResults = (new Search())
                ->registerModel(Product::class, ['name', 'brand', 'description']) // áp dụng tìm kiếm trên các trường name, brand, description
                ->perform($searchterm);
    
            // Xử lý trả về kết quả kèm hình ảnh và id sản phẩm
            $formattedResults = $searchResults->map(function ($result) {
                $product = Product::join('product_image', 'product_image.product_id', '=', 'products.product_id')
                    ->where('products.product_id', '=', $result->searchable->product_id)
                    ->select(
                        'products.product_id', // Chọn ID sản phẩm
                        'products.name',
                        'products.brand',
                        'products.description',
                        DB::raw('MIN(product_image.image) as image')
                    )
                    ->groupBy(
                        'products.product_id', // Đảm bảo nhóm theo product_id
                        'products.name',
                        'products.brand',
                        'products.description'
                    )
                    ->get();
    
                return $product;
            });
        }
    
        return response()->json($formattedResults);
    }
    

    // Get quantity for each category
    public function getQuantityOfCategory() {
        $result = Category::select('categories.category_id', 'categories.category_name', DB::raw('count(products.product_id) as quantity'))
                            ->leftJoin('products', 'products.category_id', '=', 'categories.category_id')
                            ->groupBy('categories.category_id', 'categories.category_name')
                            ->get();

        return response()->json($result);
    }

    public function getOrders(Request $request){
        if ($request->has('status')){
            $orders = Order::where('order_status', $request->status)
                ->join('payments', 'payments.order_id', '=', 'orders.order_id')
                ->join('users', 'users.user_id', '=', 'orders.user_id')
                ->select(
                    'orders.order_id',
                    'orders.created_at',
                    'payments.payment_method',
                    DB::raw('CONCAT_WS(" ", `first_name`, `last_name`) AS `name`'),
                    'orders.order_status',
                    'orders.amount',
                    'orders.payment_status'
                )
                ->get();
        }
        else {
            $orders = Order::join('payments', 'payments.order_id', '=', 'orders.order_id')
                ->join('users', 'users.user_id', '=', 'orders.user_id')
                ->select(
                    'orders.order_id',
                    'orders.created_at',
                    'payments.payment_method',
                    DB::raw('CONCAT_WS(" ", `first_name`, `last_name`) AS `name`'),
                    'orders.order_status',
                    'orders.amount',
                    'orders.payment_status'
                )
                ->get();
        }
        
        return response()->json($orders);
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
                'payments.reference',
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
                'products.description',
                'products.stock_quantity',
                'products.color',
                'products.category_id',
                'product_size.size',
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
                'product_image' => $item->image,
            ];
        }

        // Chuyển kết quả về dạng mảng tuần tự
        $finalResult = array_values($result);

        // Trả về kết quả dưới dạng JSON
        return response()->json($finalResult);
    }

    public function updateOrder(Request $request, $id){
        if ($request->has('order_status')){
            $order = Order::find($id);
            $order->update([
                'order_status' => $request->order_status,
            ]);

            return response()->json($order);
        }
        else if ($request->has('payment_status')){
            $order = Order::find($id);
            $order->update([
                'payment_status' => $request->payment_status
            ]);
        }
        else {
            return response()->json('Tham số không hợp lệ', 500);
        }
    }
    // statics graph
    public function statics(Request $request)
    {
        if($request->metric == 'year') {
            
            $currentYear = now()->year;

            // Tạo danh sách 10 năm gần nhất
            $years = collect(range($currentYear - 9, $currentYear))->map(function ($year) {
                return [
                    'year' => $year,
                    'revenue' => 0,
                ];
            });

            $data = Order::select(DB::raw($request->metric.'(created_at) as ' . $request->metric), DB::raw('sum(amount) as revenue'))
                ->groupBy(DB::raw($request->metric.'(created_at)'))
                ->get()
                ->keyBy($request->metric); // Chuyển kết quả thành dạng key-value theo năm

            // Kết hợp dữ liệu thực tế vào danh sách các năm
            $result = $years->map(function ($item) use ($data) {
                if ($data->has($item['year'])) {
                    $item['revenue'] = $data[$item['year']]['revenue'];
                }
                return $item;
            });
        }
        
        if($request->metric == 'month'){
            
            $currentYear = now()->year;

            // Tạo danh sách 12 tháng với doanh thu mặc định là 0
            $months = collect(range(1, 12))->map(function ($month) {
                return [
                    'month' => $month,
                    'revenue' => 0,
                ];
            });

            // Lấy dữ liệu doanh thu theo tháng từ cơ sở dữ liệu
            $data = Order::select(
                    DB::raw('MONTH(created_at) as month'),
                    DB::raw('sum(amount) as revenue')
                )
                ->whereYear('created_at', $currentYear) // Chỉ lấy dữ liệu trong năm hiện tại
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->get()
                ->keyBy('month'); // Chuyển kết quả thành key-value theo tháng

            // Kết hợp dữ liệu thực tế vào danh sách các tháng
            $result = $months->map(function ($item) use ($data) {
                if ($data->has($item['month'])) {
                    $item['revenue'] = $data[$item['month']]['revenue'];
                }
                return $item;
            });
        }

        if($request->metric == 'day'){
            
            // Lấy tháng và năm từ request, mặc định là tháng và năm hiện tại
            $month = $request->input('month', now()->month);
            $year = $request->input('year', now()->year);

            // Lấy số ngày trong tháng
            $daysInMonth = now()->setYear($year)->setMonth($month)->daysInMonth;

            // Tạo danh sách các ngày trong tháng với doanh thu mặc định là 0
            $days = collect(range(1, $daysInMonth))->map(function ($day) {
                return [
                    'day' => $day,
                    'revenue' => 0,
                ];
            });

            // Lấy dữ liệu doanh thu theo ngày từ cơ sở dữ liệu
            $data = Order::select(
                    DB::raw('DAY(created_at) as day'),
                    DB::raw('sum(amount) as revenue')
                )
                ->whereYear('created_at', $year) // Chỉ lấy dữ liệu trong năm
                ->whereMonth('created_at', $month) // Chỉ lấy dữ liệu trong tháng
                ->groupBy(DB::raw('DAY(created_at)'))
                ->get()
                ->keyBy('day'); // Chuyển kết quả thành key-value theo ngày

            // Kết hợp dữ liệu thực tế vào danh sách các ngày
            $result = $days->map(function ($item) use ($data) {
                if ($data->has($item['day'])) {
                    $item['revenue'] = $data[$item['day']]['revenue'];
                }
                return $item;
            });
        }

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

    public function getTopProducts(){
        $result = Product::select(
                'products.name', 
                'products.price', 
                DB::raw('SUM(order_items.price * order_items.quantity) as revenue'), 
                DB::raw('SUM(order_items.quantity) as total_quantity')
            )
        ->join('product_size', 'product_size.product_id', '=', 'products.product_id')
        ->join('order_items', 'order_items.product_size_id', '=', 'product_size.product_size_id')
        ->join('orders', 'orders.order_id', '=', 'order_items.order_id')
        ->where('orders.payment_status', '=', 'paid')
        ->groupBy('products.name', 'products.price')
        ->limit(5)
        ->get();
        
        return response()->json($result);
    }
}
