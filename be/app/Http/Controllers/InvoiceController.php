<?php

namespace App\Http\Controllers;

use App\Mail\InvoiceMail;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class InvoiceController extends Controller
{
    public function create(Request $request){
        $invoiceId = intval(substr(strval(microtime(true) * 10000), -6));

        // Invoice::create([
        //     'invoice_id' => $invoiceId,
        //     'order_id' => $request->orderCode,
        //     'due_date' => $request->createdAt,
        //     'subject' => 'Purchase Invoice',
        //     'customer_name' => $request->name,
        //     'customer_email' => $request->email,
        //     'currency' => 'USD - United States Dollar',
        //     'subtotal' => $request->amount,
        //     'total' => $request->amount,
        // ]);

        $items = Product::join('product_size', 'product_size.product_id', '=', 'products.product_id')
            ->join('order_items', 'order_items.product_size_id', '=', 'product_size.product_size_id')
            ->join('orders', 'orders.order_id', '=', 'order_items.order_id')
            ->leftJoin(DB::raw('(SELECT distinct product_id, image AS image_url FROM product_image ) AS image_subquery'), 
                    'products.product_id', '=', 'image_subquery.product_id')
            ->where('orders.order_id', '=', $request->orderCode)
            ->groupBy('products.name',
                'products.description',
                'order_items.price',
                'order_items.quantity')
            ->select(
                'products.name',
                'products.description',
                'order_items.quantity',
                'order_items.price',
                DB::raw('MIN(image_subquery.image_url) as image')
            )
            ->get();


        $data = [
            'invoice_id' => $invoiceId,
            'order_id' => $request->orderCode,
            'due_date' => $request->createdAt,
            'subject' => 'Purchase Invoice',
            'customer_name' => $request->name,
            'customer_email' => $request->email,
            'currency' => 'USD - United States Dollar',
            'subtotal' => $request->amount,
            'total' => $request->amount,
            'items' => $items
        ];
        
        try {
            Mail::to($request->email)->send(new InvoiceMail($data));
            return response()->json([
                'message' => 'Email đã được gửi thành công!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }
    }


}
