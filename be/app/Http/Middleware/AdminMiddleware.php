<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $excludedRoutes = [
                'api/auth/login',
            ];
        
        // If the current route is in the excluded routes, skip the middleware logic
        if (in_array($request->path(), $excludedRoutes)) {
            return $next($request);
        }
        // Kiểm tra người dùng đã đăng nhập hay chưa
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Kiểm tra vai trò (role) của người dùng
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Access denied'], 403);
        }

        // Cho phép request tiếp tục nếu là admin
        return $next($request);
    }
}
