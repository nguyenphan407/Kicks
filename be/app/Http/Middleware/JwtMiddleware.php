<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // $excludedRoutes = [
        //     'api/auth/login',
        //     'api/auth/register',
        //     'api/auth/public-page'
        // ];
    
        // // If the current route is in the excluded routes, skip the middleware logic
        // if (in_array($request->path(), $excludedRoutes)) {
        //     return $next($request);
        // }
    
        // try {
        //     $user = JWTAuth::parseToken()->authenticate();
        // } catch (Exception $e) {
        //     if ($e instanceof TokenExpiredException) {
        //         return response()->json(['error' => 'Token expired'], 401);
        //     } else if ($e instanceof TokenInvalidException) {
        //         return response()->json(['error' => 'Token invalid'], 401);
        //     } else {
        //         return response()->json(['error' => 'Token not found'], 401);
        //     }
        // }
    
        // Auth::setUser($user);

        // Proceed with the request
        return $next($request);
    }
}
