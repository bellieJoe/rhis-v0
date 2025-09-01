<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Birth;
use App\Models\HouseholdProfile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BirthController extends Controller
{
    public function store (Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "date_gave_birth" => "required|date",
            "midwife" => "required|max:100",
            "place_of_birth" => "required|exists:barangays,id",
            "type_of_birth" => "required",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            $updated_profile_detail = $household_profile->updated_details;
            $new_details = $updated_profile_detail->replicate();
            $new_details->last_menstrual_period = null;
            $new_details->is_pregnant = false;
            $new_details->save();
            $pregnancy = Birth::create([
                "household_profile_id" => $request->household_profile_id,
                "date_gave_birth" => Carbon::parse($request->date_gave_birth),
                "midwife" => $request->midwife,
                "place_of_birth" => $request->place_of_birth,
                "type_of_birth" => $request->type_of_birth,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Birth Record created successfully",
            ], 201);
        });
    }
}
