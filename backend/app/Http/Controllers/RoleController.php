<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    //
    public function getByUser(Request $request){ 
        return $request->user()->roles;
    }
}
