<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\RhuDesignation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RhuDesignationController extends Controller
{
    //
    public function store (Request $request) {
        $request->validate([
           'office' => 'required',
           'user_id' => 'required|exists:users,id',
        ], [], [
            'user_id' => 'RHU Personnel'
        ]);

        return DB::transaction(function () use ($request) {
            $office = Office::findOrFail($request->office);
            if($office->office_type != 'rhu') {
                return response()->json([
                    'message' => 'The selected office is not an RHU'
                ], 419);
            }
            RhuDesignation::where('user_id', $request->user_id)->delete();
            RhuDesignation::create([
                'office_id' => $office->id,
                'user_id' => $request->user_id
            ]) ;
            return response()->json([
                'message' => 'RHU Designation created successfully'
            ]);
        });
    }

    public function getDesignationByUserId(Request $request) {
        $designation = RhuDesignation::where('user_id', $request->user_id)->with(['office'])->first();
        Log::info($designation);
        return $designation;
    }
}
