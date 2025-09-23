<?php

namespace App\Http\Controllers;

use App\Models\BhwDesignation;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BhwDesignationController extends Controller
{
    //
    public function store (Request $request) {
        $request->validate([
           'office' => 'required|exists:offices,id',
           'user_id' => 'required|exists:users,id',
           'sitios' => 'required|array',
           'sitios.*' => 'required|exists:sitios,id',
        ], [], [
            'sitios' => 'sitios',
            'user_id' => 'BHW'
        ]);

        return DB::transaction(function () use ($request) {
            $office = Office::findOrFail($request->office);
            BhwDesignation::where('user_id', $request->user_id)->delete();
            BhwDesignation::insert(array_map(function($sitio) use ($request, $office) {
                return [
                    'barangay_id' => $office->barangay_id,
                    'user_id' => $request->user_id,
                    'sitio_id' => $sitio
                ];
            }, $request->sitios));    

            return response()->json([
                'message' => 'BHW Designation created successfully'
            ]);
        });
    }

    public function getDesignationsByUserId(Request $request) {
        return BhwDesignation::where('user_id', $request->user_id)->with('barangay')->get();
    }
}
