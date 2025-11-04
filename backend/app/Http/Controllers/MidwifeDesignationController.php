<?php

namespace App\Http\Controllers;

use App\Models\BhwDesignation;
use App\Models\MidwifeDesignation;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MidwifeDesignationController extends Controller
{
    //
    public function store (Request $request) {
        $request->validate([
           'office' => 'required|array',
           'user_id' => 'required|exists:users,id',
           'office.*' => 'required|exists:offices,id',
        ], [], [
            'sitios' => 'sitios',
            'user_id' => 'Midwife'
        ]);

        return DB::transaction(function () use ($request) {
            $offices = Office::whereIn('id', $request->office)->get();
            if(count($offices->pluck('municipality_id')->unique()->toArray()) > 1) {
                return response()->json([
                    'message' => 'The selected offices are not in the same RHU'
                ], 419);
            }
            MidwifeDesignation::where('user_id', $request->user_id)->delete();
            MidwifeDesignation::insert(array_map(function($office) use ($request) {
                return [
                    'barangay_id' => $office['barangay_id'],
                    'user_id' => $request['user_id']
                ];
            }, $offices->toArray()));    

            return response()->json([
                'message' => 'Midwife Designation created successfully'
            ]);
        });
    }

    public function getDesignationsByUserId(Request $request) {
        $designations = MidwifeDesignation::where('user_id', $request->user_id)->with(['barangay'])->get();
        Log::info($designations);
        return $designations;
    }
}
