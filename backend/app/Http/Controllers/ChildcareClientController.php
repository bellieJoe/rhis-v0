<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ChildcareClient;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

use function Symfony\Component\Clock\now;

class ChildcareClientController extends Controller
{
    //
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)"; 

    public function getCandidates(Request $request)
    {
        $barangays = auth()->user()->midwifeBarangays->pluck('id')->toArray();

        $candidates = HouseholdProfile::whereHas('household', function($q) use ($barangays) {
            $q->whereIn('barangay_id', $barangays);
        })
        ->whereBetween('birthdate', [Carbon::now()->subYears(2)->toDateString(), Carbon::now()->toDateString()])
        ->doesntHave('childcareClient')
        ->with(['household.barangay.municipality.province']); 

        return response()->json($candidates->paginate(20));
    }

    public function getClients()
    {
        $clients = ChildcareClient::query()->with(['householdProfile.household.barangay.municipality.province']);
        return response()->json($clients->paginate(15));
    }

    public function register(Request $request)
    {
        $householdProfileId = request('household_profile_id');
        $householdProfile = HouseholdProfile::find($householdProfileId);
        if(!$householdProfileId || !$householdProfile) {
            return response()->json([
                'message' => 'Household Profile ID is required'
            ], 400);
        }
        ChildcareClient::create([
            'household_profile_id' => $householdProfileId,
            'encoded_by' => auth()->user()->id,
            'date_of_registration' => now(),
            'date_of_birth' => $householdProfile->birthdate,
            'name_of_child' => $householdProfile->updated_details->firstname . ' ' . $householdProfile->updated_details->lastname,
            'sex' => $householdProfile->updated_details->gender_id,
            'complete_name_of_mother' => '',
            'complete_address' => '',
            'length' => $request->length,
            'weight' => $request->input('weight')
        ]);

        return response()->json([
            'message' => 'Childcare Client registered successfully'
        ], 201);
    }

    public function update(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $clientId = $request->input('id');
            $client = ChildcareClient::find($clientId);
            $client->update($request->only([
                'family_serial_number',
                'name_of_child',
                'sex',
                'complete_name_of_mother',
                'complete_address',
                'cpab_a',
                'cpab_b',
                'length',
                'weight',
                'initial_breastfeeding_duration',
                'immunization_bcg',
                'immunization_hepa_b',
                'nsa_age_13',
                'nsa_length_13',
                'nsa_weight_13',
                'nsa_status_13',
                'lbwgi_1month_13',
                'lbwgi_2month_13',
                'lbwgi_3month_13',
                'dhh_1st_dose_13',
                'dhh_2nd_dose_13',
                'dhh_3rd_dose_13',
                'opv_1st_dose_13',
                'opv_2nd_dose_13',
                'opv_3rd_dose_13',
                'pcv_1st_dose_13',
                'pcv_2nd_dose_13',
                'pcv_3rd_dose_13',
                'ipv_1st_dose_13',
                'nsa_age_611',
                'nsa_length_611',
                'nsa_weight_611',
                'nsa_status_611',
                'eb_611',
                'icf_1_611',
                'icf_2_611',
                'vit_a_611',
                'mnp_90_611',
                'mnp_completed_611',
                'mmr_611',
                'ipv_dose2_611',
                'nsa_age_12',
                'nsa_length_12',
                'nsa_weight_12',
                'nsa_status_12',
                'mmr_dose2_12',
                'fic_12',
                'cic',
                'mam_admitted_011',
                'mam_cured_011',
                'mam_defaulted_011',
                'mam_died_011',
                'sam_admitted_011',
                'sam_cured_011',
                'sam_defaulted_011',
                'sam_died_011',
                'remarks',
            ]));

            return response()->json([
                'message' => 'Childcare Client updated successfully'
            ], 200);
        });
    }
}
