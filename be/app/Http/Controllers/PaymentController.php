<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Error;
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
            "orderCode" => intval(substr(strval(microtime(true) * 10000), -6)),
            "amount" => $request->price,
            "description" => "VQRIO123",
            "buyerName" => "Nguyen Van A",
            "buyerEmail" => "phn040704@gmail.com",
            "buyerPhone" => "0961187213",
            "buyerAddress" => "số nhà, đường, phường, tỉnh hoặc thành phố",
            "items" => $request->items,
            "returnUrl" => $request->returnUrl,
            "cancelUrl" => $request->cancelUrl
        ];

        try {
            OrderController::store($data);
        } catch (Error $e) {
            return $e;
        }

        $response = $this->payOS->createPaymentLink($data);
        return $response['checkoutUrl'];
    }

    public function getPaymentInfo($orderCode){

        $response = $this->payOS->getPaymentLinkInformation($orderCode);

        if ($response['status'] == 'PAID'){
            $payment = Payment::create([
                'order_id' => $response['orderCode'],
                'payment_method' => 'bank_transfer',
                'amount' => $response['amountPaid'],
            ]);  

            foreach ($response['transactions'] as $transaction){
                $payment->bank_id = $transaction['counterAccountBankId'];
                $payment->account_name = $transaction['counterAccountName'];
                $payment->account_number = $transaction['counterAccountNumber'];
                $payment->description = $transaction['description'];
                $payment->reference = $transaction['reference'];
            } 

            $payment->save();

            OrderController::update(null, 'paid', $response['orderCode']);
        }
        else {
            OrderController::update(null, 'failed', $response['orderCode']);
        } 

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
