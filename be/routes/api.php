<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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
Route::get('/', [AuthController::class,'login']);

// Product route
Route::group([

    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix'=> 'product'

], function ($router) {
    Route::get('/', [ProductController::class,'index']);
    Route::get('/{id}', [ProductController::class,'show']);
    Route::post('store', [ProductController::class,'store']);
    Route::put('update', [ProductController::class,'update']);
    Route::delete('delete/{id}', [ProductController::class,'destroy']);
    Route::get('filter', [ProductController::class,'filter']);
});
Route::get('/', [AuthController::class,'login']);
