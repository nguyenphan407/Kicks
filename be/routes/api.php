<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductSizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth route
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'

], function ($router) {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::get('/', function () {
        return "Hoang Nguyen cute";
    });
})->middleware('jwt');

// User route
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'user'

], function ($router) {
    Route::get('{id}', [UserController::class, 'show']);
    Route::put('update', [UserController::class, 'update']);
})->middleware('jwt');

// Product route
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'product'

], function ($router) {
    Route::get('/', [ProductController::class, 'index']); // URL: /product
    Route::get('show/{id}', [ProductController::class, 'show'])->name('product.show'); // URL: /product/show/{id}
    Route::get('filter', [ProductController::class, 'filter']); // URL: /product/filter
    Route::get('recommend', [ProductController::class, 'recommendedProducts']); // URL: /product/recommend
    Route::get('recent', [ProductController::class, 'recentViewed']);
    Route::get('search', [ProductController::class, 'search']); // URL: /product/search
})->middleware('jwt');

// Cart route
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'cart'

], function ($router) {
    Route::get('/', [CartController::class, 'index']);
    Route::post('/', [CartController::class, 'add']);
    Route::put('/{id}', [CartController::class, 'update']);
    Route::delete('/{id}', [CartController::class, 'remove']);
    Route::delete('/', [CartController::class, 'clear']);
})->middleware('jwt');

// Order & OrderItem route
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'orders'

], function ($router) {
    Route::get('/', [OrderController::class, 'index']);
    Route::post('/', [OrderController::class, 'store']);
    Route::get('/items/{order_id}', [OrderItemController::class, 'index']);
})->middleware('jwt');

Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'category'

], function ($router) {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'show'])->name('category.show');
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/', [CategoryController::class, 'destroy']);
})->middleware('jwt');

//Payment Routes
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'payment'

], function ($router) {
    Route::post('/create-payment-link', [PaymentController::class, 'createPaymentLink']);
    Route::get('get-info/{orderCode}', [PaymentController::class, 'getPaymentInfo']);
})->middleware('jwt');

// Email Routes
Route::post('/send-mail', [MailController::class, 'sendEmail']);

// Admin Routes
Route::group([

    'namespace' => 'App\Http\Controllers',
    'prefix' => 'admin'

], function ($router) {
    Route::get('/', [AdminController::class, 'index']);
    Route::get('/category', [AdminController::class, 'getQuantityOfCategory']);
    Route::get('/order', [AdminController::class, 'getOrders']);
    Route::get('/order/{id}', [AdminController::class, 'getOrderInfo']);
    Route::get('/statics', [AdminController::class, 'statics']);
    Route::get('/report', [AdminController::class, 'report']);
    Route::get('/topProducts', [AdminController::class, 'getTopProducts']);
    Route::get('show/{id}', [AdminController::class, 'show']);
    Route::get('search', [AdminController::class, 'search']);
    Route::post('store', [ProductController::class, 'store']);
    Route::post('create_invoice', [InvoiceController::class, 'create']);  
    Route::post('size/store', [ProductSizeController::class, 'store']); 
    Route::put('update/{id}', [ProductController::class, 'update']); 
    Route::put('order/update/{id}', [AdminController::class, 'updateOrder']);
    Route::delete('delete/{id}', [ProductController::class, 'destroy']);
    Route::delete('image/delete/{id}', [ProductImageController::class, 'delete']);
})->middleware('admin');
