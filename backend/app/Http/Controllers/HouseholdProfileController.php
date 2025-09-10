<?php

namespace App\Http\Controllers;

use App\Models\Household;
use App\Models\HouseholdProfile;
use App\Models\HouseholdProfileDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HouseholdProfileController extends Controller
{
    //
    public function index(Request $request) {
        
        $query = HouseholdProfile::query()
            ->with(['household']);
            

        if($request->has('only_head') && $request->only_head) {
            $query->whereHas(
                'householdProfileDetails', function ($query) {
                    $query->where([
                        'is_active' => true,
                        ['member_relationship_id', 1]
                ]);
            });
        }

        if($request->has('only_members') && $request->only_members) {
            $query->whereHas(
                'householdProfileDetails', function ($query) {
                    $query->where([
                        'is_active' => true,
                        ['member_relationship_id', "<>", 1]
                ]);
            });
        }

        if($request->filled('municipality') && !$request->has('barangay')) {
            $query->whereHas(
                'household', function ($q) use ($request) {
                    $q->whereHas(
                        'barangay', function ($q) use ($request) {
                            $q->where('municipality_id', $request->municipality);
                    });
            });
        }

        if($request->filled('barangay') && $request->barangay) {
            $query->whereHas(
                'household', function ($q) use ($request) {
                    $q->where('barangay_id', $request->barangay);
            });
        }

        if($request->filled('household_no') && $request->household_no) {
            $query->whereHas(
                'household', function ($q) use ($request) {
                    $q->where('household_no', $request->household_no);
            });
        }

        return $query->paginate(20);
    }
    
    public function store(Request $request) {
        $request->validate([
            "household_id" => "required|exists:households,id",
            "lastname" => "required|max:50",
            "firstname" => "required|max:50",
            "middlename" => "required|max:50",
            "birthdate" => "required|date|before:today",
            "member_relationship_id" => "required|exists:generic_types,id",
            "other_relation" => "nullable|required_if:member_relationship_id,5|max:50",
            "gender_id" => "required|exists:generic_types,id",
            "civil_status_id" => "required|exists:generic_types,id",
            "educational_attainment_id" =>  "required|exists:generic_types,id",
            "religion_id" => "required|exists:generic_types,id",
            "other_religion" =>  "nullable|required_if:religion_id,37|max:50",
            // "unit_id" => "",
            // "enthnicity" => "required|in:IP,Non-IP",
            // "fourps_member" => "required|boolean",
            // "fourps_household_no" =>  "nullable|required_if:fourps_member,true|max:50",
            // "philhealth_id" => "required|max:50",
            // "philheath_membership_type_id" =>  "required|exists:generic_types,id",
            // "philhealth_category_id" => "required|exists:generic_types,id",
            // "medical_history_id" => "nullable|exists:generic_types,id",
            // "other_medical_history" => "nullable|max:50",
            // "classification_by_age_hrg_id" =>  "required|exists:generic_types,id",
            // "last_menstrual_period" =>  "nullable|required_if:gender_id,80|date|before:today",
            // "is_using_fp_method" => "nullable|required_if:gender_id,80|boolean",
            // "family_planning_method_id" =>  "nullable|required_if:is_using_fp_method,true|exists:generic_types,id",
            // "family_planning_status_id" =>  "nullable|required_if:is_using_fp_method,true|exists:generic_types,id",
            // "water_source_type_id" => "required|exists:generic_types,id",
            // "toilet_facility_type_id" =>  "required|exists:generic_types,id",
            // "hc_mhgap" =>  "required|boolean",
            // "hc_asthma" => "required|boolean",
            // "hc_cancer" => "required|boolean",
            // "hc_pwd" => "required|boolean",
            // "hc_stroke" => "required|boolean",
            // "hc_mass" => "required|boolean",
            // "hc_smoker" => "required|boolean",
            // "hc_alchohol_drinker" => "required|boolean",
        ], 
        [],
        [

        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::create([
                "household_id" => $request->input("household_id"),
                "birthdate" => $request->input("birthdate"),
                "is_active" => true,
            ]);
            HouseholdProfileDetail::create([
                "household_profile_id" => $household_profile->id,
                "lastname" => $request->input("lastname"),
                "firstname" => $request->input("firstname"),
                "middlename" => $request->input("middlename"),
                "member_relationship_id" => $request->input("member_relationship_id"),
                "other_relation" => $request->input("member_relationship_id") == 5 ? $request->input("other_relation") : null,
                "gender_id" => $request->input("gender_id"),
                "civil_status_id" => $request->input("civil_status_id"),
                "educational_attainment_id" => $request->input("educational_attainment_id"),
                "religion_id" => $request->input("religion_id"),
                "other_religion" => $request->input("religion_id") == 37 ? $request->input("other_religion") : null,
                // "enthnicity" => $request->input("enthnicity"),
                // "fourps_member" => $request->input("fourps_member"),
                // "fourps_household_no" => $request->input("fourps_member") ? $request->input("fourps_household_no") : null,
                // "philhealth_id" => $request->input("philhealth_id"),
                // "philheath_membership_type_id" => $request->input("philheath_membership_type_id"),
                // "philhealth_category_id" => $request->input("philhealth_category_id"),
                // "medical_history_id" => $request->input("medical_history_id"),
                // "other_medical_history" => null,
                // "classification_by_age_hrg_id" => $request->input("classification_by_age_hrg_id"),
                // "last_menstrual_period" => $request->input("gender_id") == 80 ? $request->input("last_menstrual_period") : null,
                // "is_using_fp_method" => $request->input("gender_id") == 80 ? $request->input("is_using_fp_method") : null,
                // "family_planning_method_id" => $request->input("is_using_fp_method") ? $request->input("family_planning_method_id") : null,
                // "family_planning_status_id" => $request->input("is_using_fp_method") ? $request->input("family_planning_status_id") : null,
                // "water_source_type_id" => $request->input("water_source_type_id"),
                // "toilet_facility_type_id" => $request->input("toilet_facility_type_id"),
                // "hc_mhgap" => $request->input("hc_mhgap"),
                // "hc_asthma" => $request->input("hc_asthma"),
                // "hc_cancer" => $request->input("hc_cancer"),
                // "hc_pwd" => $request->input("hc_pwd"),
                // "hc_stroke" => $request->input("hc_stroke"),
                // "hc_mass" => $request->input("hc_mass"),
                // "hc_smoker" => $request->input("hc_smoker"),
                // "hc_alchohol_drinker" => $request->input("hc_alchohol_drinker"),
            ]);

            return response()->json([
                "message" => "Household profile created successfully"
            ]);
        });
    }

    public function updateAdditionalInfo(Request $request) {
        $request->validate([
            'household_profile_id' => 'required|exists:household_profiles,id',
            // "household_id" => "required|exists:households,id",
            // "lastname" => "required|max:50",
            // "firstname" => "required|max:50",
            // "middlename" => "required|max:50",
            // "birthdate" => "required|date|before:today",
            // "member_relationship_id" => "required|exists:generic_types,id",
            // "other_relation" => "nullable|required_if:member_relationship_id,5|max:50",
            // "gender_id" => "required|exists:generic_types,id",
            // "civil_status_id" => "required|exists:generic_types,id",
            // "educational_attainment_id" =>  "required|exists:generic_types,id",
            // "religion_id" => "required|exists:generic_types,id",
            // "other_religion" =>  "nullable|required_if:religion_id,37|max:50",
            // "unit_id" => "",
            "enthnicity" => "required|in:IP,Non-IP",
            "fourps_member" => "required|boolean",
            "fourps_household_no" =>  "nullable|required_if:fourps_member,true|max:50",
            "philhealth_id" => "nullable|required_if:philheath_membership_type_id,81|max:50",
            "philheath_membership_type_id" =>  "required|exists:generic_types,id",
            "philhealth_category_id" => "required|exists:generic_types,id",
            "medical_history_id" => "nullable|exists:generic_types,id",
            "other_medical_history" => "nullable|max:50",
            "classification_by_age_hrg_id" =>  "required|exists:generic_types,id",
            "is_pregnant" =>  "required|boolean",
            "last_menstrual_period" =>  "nullable|required_if:is_pregnant,true|date|before:today",
            "is_using_fp_method" => "nullable|required_if:gender_id,80|boolean",
            "family_planning_method_id" =>  "nullable|required_if:is_using_fp_method,true|exists:generic_types,id",
            "family_planning_status_id" =>  "nullable|required_if:is_using_fp_method,true|exists:generic_types,id",
            "water_source_type_id" => "required|exists:generic_types,id",
            "toilet_facility_type_id" =>  "required|exists:generic_types,id",
            "hc_mhgap" =>  "required|boolean",
            "hc_asthma" => "required|boolean",
            "hc_cancer" => "required|boolean",
            "hc_pwd" => "required|boolean",
            "hc_stroke" => "required|boolean",
            "hc_mass" => "required|boolean",
            "hc_smoker" => "required|boolean",
            "hc_alchohol_drinker" => "required|boolean",
        ], 
        [],
        [

        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->input("household_profile_id"));
            
            $updatedDetails = HouseholdProfileDetail::where("household_profile_id", $request->input("household_profile_id"))->orderBy("created_at", "desc")->first();

            HouseholdProfileDetail::create([
                "household_profile_id" => $household_profile->id,
                "lastname" => $updatedDetails->lastname,
                "firstname" => $updatedDetails->firstname,
                "middlename" => $updatedDetails->middlename,
                "member_relationship_id" => $updatedDetails->member_relationship_id,
                "other_relation" => $updatedDetails->other_relation,
                "gender_id" => $updatedDetails->gender_id,
                "civil_status_id" => $updatedDetails->civil_status_id,
                "educational_attainment_id" => $updatedDetails->educational_attainment_id,
                "religion_id" => $updatedDetails->religion_id,
                "other_religion" => $updatedDetails->other_religion,

                "enthnicity" => $request->input("enthnicity"),
                "fourps_member" => $request->input("fourps_member"),
                "fourps_household_no" => $request->input("fourps_member") ? $request->input("fourps_household_no") : null,
                "philhealth_id" => $request->input("philheath_membership_type_id") == 81 ? $request->input("philhealth_id")  : null,
                "philheath_membership_type_id" => $request->input("philheath_membership_type_id"),
                "philhealth_category_id" => $request->input("philhealth_category_id"),
                "medical_history_id" => $request->input("medical_history_id"),
                "other_medical_history" => null,
                "classification_by_age_hrg_id" => $request->input("classification_by_age_hrg_id"),
                "is_pregnant" => $request->input("gender_id") == 80 ? $request->input("is_pregnant") : false,
                "last_menstrual_period" => $request->input("gender_id") == 80 && $request->input("is_pregnant") ? $request->input("last_menstrual_period") : null,
                "is_using_fp_method" => $request->input("gender_id") == 80 ? $request->input("is_using_fp_method") : null,
                "family_planning_method_id" => $request->input("is_using_fp_method") ? $request->input("family_planning_method_id") : null,
                "family_planning_status_id" => $request->input("is_using_fp_method") ? $request->input("family_planning_status_id") : null,
                "water_source_type_id" => $request->input("water_source_type_id"),
                "toilet_facility_type_id" => $request->input("toilet_facility_type_id"),
                "hc_mhgap" => $request->input("hc_mhgap"),
                "hc_asthma" => $request->input("hc_asthma"),
                "hc_cancer" => $request->input("hc_cancer"),
                "hc_pwd" => $request->input("hc_pwd"),
                "hc_stroke" => $request->input("hc_stroke"),
                "hc_mass" => $request->input("hc_mass"),
                "hc_smoker" => $request->input("hc_smoker"),
                "hc_alchohol_drinker" => $request->input("hc_alchohol_drinker"),
            ]);

            return response()->json([
                "message" => "Household profile updated successfully"
            ]);
        });
    }

    public function updateMainInfo(Request $request) {
        $request->validate([
            'household_profile_id' => 'required|exists:household_profiles,id',
            "household_id" => "required|exists:households,id",
            "lastname" => "required|max:50",
            "firstname" => "required|max:50",
            "middlename" => "required|max:50",
            "birthdate" => "required|date|before:today",
            "member_relationship_id" => "required|exists:generic_types,id",
            "other_relation" => "nullable|required_if:member_relationship_id,5|max:50",
            "gender_id" => "required|exists:generic_types,id",
            "civil_status_id" => "required|exists:generic_types,id",
            "educational_attainment_id" =>  "required|exists:generic_types,id",
            "religion_id" => "required|exists:generic_types,id",
            "other_religion" =>  "nullable|required_if:religion_id,37|max:50",
            "unit_id" => "",

            // "enthnicity" => "required|in:IP,Non-IP",
            // "fourps_member" => "required|boolean",
            // "fourps_household_no" =>  "nullable|required_if:fourps_member,true|max:50",
            // "philhealth_id" => "required|max:50",
            // "philheath_membership_type_id" =>  "required|exists:generic_types,id",
            // "philhealth_category_id" => "required|exists:generic_types,id",
            // "medical_history_id" => "nullable|exists:generic_types,id",
            // "other_medical_history" => "nullable|max:50",
            // "classification_by_age_hrg_id" =>  "required|exists:generic_types,id",
            // "is_pregnant" =>  "required|boolean",
            // "last_menstrual_period" =>  "nullable|required_if:gender_id,80|date|before:today",
            // "is_using_fp_method" => "nullable|required_if:gender_id,80|boolean",
            // "family_planning_method_id" =>  "nullable|required_if:is_using_fp_method,true|exists:generic_types,id",
            // "family_planning_status_id" =>  "nullable|required_if:is_using_fp_method,true|exists:generic_types,id",
            // "water_source_type_id" => "required|exists:generic_types,id",
            // "toilet_facility_type_id" =>  "required|exists:generic_types,id",
            // "hc_mhgap" =>  "required|boolean",
            // "hc_asthma" => "required|boolean",
            // "hc_cancer" => "required|boolean",
            // "hc_pwd" => "required|boolean",
            // "hc_stroke" => "required|boolean",
            // "hc_mass" => "required|boolean",
            // "hc_smoker" => "required|boolean",
            // "hc_alchohol_drinker" => "required|boolean",
        ], 
        [],
        [

        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->input("household_profile_id"));

            $updatedDetails = HouseholdProfileDetail::where("household_profile_id", $request->input("household_profile_id"))->orderBy("created_at", "desc")->first();
            HouseholdProfile::where("id", $request->input("household_profile_id"))->update([
                "birthdate" => Carbon::parse($request->input("birthdate")),
            ]);
            HouseholdProfileDetail::create([
                "household_profile_id" => $household_profile->id,
                "lastname" => $request->input("lastname"),
                "firstname" => $request->input("firstname"),
                "middlename" => $request->input("middlename"),
                "member_relationship_id" => $request->input("member_relationship_id"),
                "other_relation" => $request->input("member_relationship_id") == 5 ? $request->input("other_relation") : null,
                "gender_id" => $request->input("gender_id"),
                "civil_status_id" => $request->input("civil_status_id"),
                "educational_attainment_id" => $request->input("educational_attainment_id"),
                "religion_id" => $request->input("religion_id"),
                "other_religion" => $request->input("religion_id") == 37 ? $request->input("other_religion") : null,

                "enthnicity" => $updatedDetails->enthnicity,
                "fourps_member" => $updatedDetails->fourps_member,
                "fourps_household_no" => $updatedDetails->fourps_household_no,
                "philhealth_id" => $updatedDetails->philhealth_id,
                "philheath_membership_type_id" => $updatedDetails->philheath_membership_type_id,
                "philhealth_category_id" => $updatedDetails->philhealth_category_id,
                "medical_history_id" => $updatedDetails->medical_history_id,
                "other_medical_history" => null,
                "classification_by_age_hrg_id" => $updatedDetails->classification_by_age_hrg_id,
                "is_pregnant" => $updatedDetails->is_pregnant,
                "last_menstrual_period" => $updatedDetails->last_menstrual_period,
                "is_using_fp_method" => $updatedDetails->is_using_fp_method,
                "family_planning_method_id" => $updatedDetails->family_planning_method_id,
                "family_planning_status_id" => $updatedDetails->family_planning_status_id,
                "water_source_type_id" => $updatedDetails->water_source_type_id,
                "toilet_facility_type_id" => $updatedDetails->toilet_facility_type_id,
                "hc_mhgap" => $updatedDetails->hc_mhgap,
                "hc_asthma" => $updatedDetails->hc_asthma,
                "hc_cancer" => $updatedDetails->hc_cancer,
                "hc_pwd" => $updatedDetails->hc_pwd,
                "hc_stroke" => $updatedDetails->hc_stroke,
                "hc_mass" => $updatedDetails->hc_mass,
                "hc_smoker" => $updatedDetails->hc_smoker,
                "hc_alchohol_drinker" => $updatedDetails->hc_alchohol_drinker,
            ]);

            return response()->json([
                "message" => "Household profile updated successfully"
            ]);
        });
    }

    public function show($id) {
        return HouseholdProfile::find($id);
    }

    public function destroy($id) {
        $household_profile = HouseholdProfile::find($id);
        if(!$household_profile) {
            return response()->json([
                "message" => "Household profile not found"
            ], 404);
        }

        $household_profile->delete();

        return response()->json([
            "message" => "Household profile deleted successfully"
        ]);
    }
    
    
}
