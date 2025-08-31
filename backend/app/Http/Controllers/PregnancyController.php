<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HouseholdProfile;
use App\Models\Pregnancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PregnancyController extends Controller
{
    //
    public function store(Request $request) {
        //
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "last_menstrual_period" => "required|date",
            "date_of_giving_birth" => "required|date",
            "number_of_pregnancy" => "required|numeric|min:1",
            "age" => "required|numeric|min:1"
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            $updated_profile_detail = $household_profile->updated_details;
            $new_details = $updated_profile_detail->replicate();
            $new_details->last_menustrual_period = $request->last_menstrual_period;
            $new_details->is_pregnant = true;
            $new_details->save();
            $pregnancy = Pregnancy::create([
                "household_profile_id" => $request->household_profile_id,
                "last_menstrual_period" => $request->last_menstrual_period,
                "date_of_giving_birth" => $request->date_of_giving_birth,
                "number_of_pregnancy" => $request->number_of_pregnancy,
                "age" => $request->age
            ]);
            return response()->json([
                "message" => "Pregnancy created successfully",
            ], 201);
        });
    }
}
