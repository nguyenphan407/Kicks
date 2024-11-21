<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PayOS\PayOS;

class PaymentController extends Controller
{
    protected $payOS;
    public function __construct(){
        $this->payOS = new PayOS(config('services.payos.client_id'), config('services.payos.api_key'), config('services.payos.checksum_key'));
    }
    public function createPaymentLink(Request $request) {
        $data = [
            // "orderCode" => intval(substr(strval(microtime(true) * 10000), -6)),
            // "amount" => $request->amount,
            // "description" => $request->description,
            // "items" => [
            //     0 => [
            //         'name' => 'Mì tôm Hảo Hảo ly',
            //         'price' => 2000,
            //         'quantity' => 1
            //     ]
            // ],
            "orderCode" => intval(substr(strval(microtime(true) * 10000), -6)),
            "amount" => 2000,
            "description" => "Thanh toán đơn hàng",
            "returnUrl" => $request->returnUrl . "?success=true",
            "cancelUrl" => $request->cancelUrl . "?canceled=true"
        ];

        $response = $this->payOS->createPaymentLink($data);
        return $response['checkoutUrl'];
    }

    public function getPaymentInfo($orderCode){

        $response = $this->payOS->getPaymentLinkInformation($orderCode);

        return response()->json($response);
    }

    public function handlePayOSWebhook(Request $request)
    {
        $body = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json([
                "error" => 1,
                "message" => "Invalid JSON payload"
            ], 400);
        }

        // Handle webhook test
        if (in_array($body["data"]["description"], ["Ma giao dich thu nghiem", "VQRIO123"])) {
            return response()->json([
                "error" => 0,
                "message" => "Ok",
                "data" => $body["data"]
            ]);
        }

        try {
            $this->payOS->verifyPaymentWebhookData($body);
        } catch (\Exception $e) {
            return response()->json([
                "error" => 1,
                "message" => "Invalid webhook data",
                "details" => $e->getMessage()
            ], 400);
        }

        // Process webhook data
        // ...

        return response()->json([
            "error" => 0,
            "message" => "Ok",
            "data" => $body["data"]
        ]);
    }
}
