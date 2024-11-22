<?php

namespace App\Http\Controllers;

use App\Mail\TestMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail()
    {
        $mailData = [
            'title' => 'Thông báo xác thực tài khoản từ Kicks',
            'name' => 'Hoàng Nguyên',
            'verification_url' => 'http://localhost:5173/'
        ];
        
        try {
            Mail::to('22520984@gm.uit.edu.vn')->send(new TestMail($mailData));
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