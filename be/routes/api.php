<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductSizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth route
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'

], function ($router) {
    
    Route::post('register', [AuthController::class,'register']);
    Route::post('login', [AuthController::class,'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
    Route::get('/', function () {
        return "Hoang Nguyen cute";
    });
});

// User route
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'user'

], function ($router) {
    Route::get('{id}', [UserController::class,'show']);
    Route::put('update', [UserController::class,'update']);
});

// Product route
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'product'

], function ($router) {
    Route::get('/', [ProductController::class, 'index']); // URL: /product
    Route::get('show/{id}', [ProductController::class, 'show']); // URL: /product/show/{id}
    Route::get('filter', [ProductController::class, 'filter']); // URL: /product/filter
    Route::get('recommend', [ProductController::class, 'recommendedProducts']); // URL: /product/recommend
    Route::post('store', [ProductController::class, 'store']); // URL: /product/store
    Route::post('size/store', [ProductSizeController::class, 'store']); // URL: /product/size/store
    Route::patch('update/{id}', [ProductController::class, 'update']); // URL: /product/update/{id}
    Route::delete('delete/{id}', [ProductController::class, 'destroy']); // URL: /product/delete/{id}
});

// Cart route
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'cart'

], function ($router) {
    Route::get('/', [CartController::class, 'index']);
    Route::post('/', [CartController::class, 'add']);
    Route::put('/{id}', [CartController::class, 'update']);
    Route::delete('/{id}', [CartController::class, 'remove']);
    Route::delete('/', [CartController::class, 'clear']);
});

// Order & OrderItem route
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'orders'

], function ($router) {
    Route::get('/', [OrderController::class, 'index']);
    Route::post('/', [OrderController::class, 'store']);
    Route::get('/items/{order_id}', [OrderItemController::class, 'index']);
});

Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'category'

], function ($router) {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/', [CategoryController::class, 'destroy']);
});

//Payment Routes
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'payment'

], function ($router) {
    Route::post('/create-payment-link', [PaymentController::class, 'createPaymentLink']);
});