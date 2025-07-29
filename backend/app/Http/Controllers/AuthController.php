<?php

namespace App\Http\Controllers;

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
 
            return Auth::user();
        }
 
        return response([
            'error' => 'The provided credentials are incorrect.'
        ], 401);
    }

    public function user(){
        return Auth::user();
    }

    public function isAuth() {
        return response()->json(Auth::check());
    }
}
