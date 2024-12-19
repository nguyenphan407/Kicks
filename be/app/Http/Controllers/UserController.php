<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    //
    public function show($id)
    {
        $user = User::find($id);
        
        return response()->json($user);
    }

    public function update(Request $request)
    {
        if ($request->has('user_id')){
            $user = User::find($request->user_id);
        }
        else {
            $user = JWTAuth::parseToken()->toUser();
        }

        $validatedData = $request->validate([
            'first_name' => 'sometimes|required|string|max:50',
            'last_name'  => 'sometimes|required|string|max:50',
            'email'      => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone_number' => 'sometimes|string|max:20',
            'password'   => 'sometimes|string|min:6',
            'avatar' => 'sometimes',
        ]);

        $user->first_name = $validatedData['first_name'] ?? $user->first_name;
        $user->last_name = $validatedData['last_name'] ?? $user->last_name;
        $user->email = $validatedData['email'] ?? $user->email;
        $user->phone_number = $validatedData['phone_number'] ?? $user->phone_number;
        
        if (isset($validatedData['password'])) {
            $user->password = bcrypt($validatedData['password']);
        }

        $user->avatar = $request->avatar ?? $user->avatar;
        $user->save();

        if ($user->wasChanged()) {
            return response()->json(['message' => 'User updated successfully', 'user' => $user]);
        } else {
            return response()->json(['message' => 'No changes were made'], 200);
        }
    }

    public function delete(Request $request) {
        $user = User::findOrFail($request->user_id);

        $user->delete();

        return response()->json("User deleted successfully");
    }
}
