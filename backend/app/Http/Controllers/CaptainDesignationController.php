<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CaptainDesignation;
use App\Models\Sitio;
use Illuminate\Http\Request;

class CaptainDesignationController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'office' => 'required|exists:offices,id',
            'user_id' => 'required|exists:users,id'
        ]);
        $office_id = $request->input('office');
        $user_id = $request->input('user_id');
        CaptainDesignation::where('office_id', $office_id)->orWhere('user_id', $user_id)->delete();
        CaptainDesignation::create([
            'office_id' => $office_id,
            'user_id' => $user_id
        ]);
    }

    public function getDesignationByUserId(Request $request, $user_id) {
        return CaptainDesignation::where('user_id', $user_id)->with(['office'])->first();
    }

    public function getSitios(Request $request, $user_id) {
        $designation = CaptainDesignation::where('user_id', $user_id)->with(['office'])->first();
        if(!$designation) {
            return response()->json(["message" => "User has no designation"], 419);
        }
        return Sitio::where('barangay_id', $designation->office->barangay_id)->get();
    }
}
