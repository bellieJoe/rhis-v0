<?php

namespace App\Http\Controllers;

use App\Models\RoleType;
use Illuminate\Http\Request;

class RoleTypeController extends Controller
{
    //
    public function index(){
        return RoleType::all();
    }

    
}
