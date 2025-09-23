<?php

namespace App\Http\Controllers;

use App\Models\BhwDesignation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BhwDesignationController extends Controller
{
    //
    public function store (Request $request) {
        $request->validate([
           'barangay_id' => 'required|exists:barangays,id',
           'user_id' => 'required|exists:users,id',
           'sitios' => 'required|array',
           'sitios.*' => 'required|exists:sitios,id',
        ], [], [
            'sitios' => 'sitios',
            'user_id' => 'BHW',
            'barangay_id' => 'Barangay'
        ]);

        return DB::transaction(function () use ($request) {
            BhwDesignation::insert(array_map(function($sitio) use ($request) {
                return [
                    'barangay_id' => $request->barangay_id,
                    'user_id' => $request->user_id,
                    'sitio_id' => $sitio
                ];
            }, $request->sitios));    

            return response()->json([
                'message' => 'BHW Designation created successfully'
            ]);
        });
    }
}
