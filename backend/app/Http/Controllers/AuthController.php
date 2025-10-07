<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return response()->json(User::with('roles', 'roles.roleType', 'bhwDesignations')->find(Auth::user()->id));
        }
 
        return response([
            'error' => 'The provided credentials are incorrect.'
        ], 401);
    }

    public function user(){
        return response()->json(User::with('roles', 'roles.roleType', 'bhwDesignations')->find(Auth::user()->id));
    }

    public function isAuth() {
        return response()->json(Auth::check());
    }

    public function logout() {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
