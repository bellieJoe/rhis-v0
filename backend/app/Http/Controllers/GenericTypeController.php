<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GenericType;
use Illuminate\Http\Request;

class GenericTypeController extends Controller
{
    //
    public function index(Request $request) {
        $types = GenericType::query();
        if($request->has('type')) {
            $types->where('type', $request->type);
        }
        return response($types->get());
    }
}
