<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FamilyPlanningClient;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class FamilyPlanningClientController extends Controller
{
    //
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)"; 

    public function getCandidates(Request $request)
    {
        $barangays = auth()->user()->midwifeBarangays->pluck('id')->toArray();

        $candidates = HouseholdProfile::whereHas('household', function($q) use ($barangays) {
            $q->whereIn('barangay_id', $barangays);
        })
        ->whereHas('householdProfileDetails', function($q) {
            $q->whereRaw($this->latesDetailQueryString)
            ->where('gender_id', 80);
        })
        ->whereBetween('birthdate', [
            Carbon::now()->subYears(49)->toDateString(), // 49 years old (oldest)
            Carbon::now()->subYears(15)->toDateString()  // 15 years old (youngest)
        ])
        ->whereDoesntHave('familyPlanningClients', function($q){
            $q->whereYear('date_of_registration', Carbon::now()->year);
        })
        ->with(['household.barangay.municipality.province']); 

        return response()->json($candidates->paginate(20));
    }

    public function getClients()
    {
        $clients = FamilyPlanningClient::query()->with(['householdProfile.household.barangay.municipality.province']);
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
        FamilyPlanningClient::create([
            'household_profile_id' => $householdProfileId,
            'encoded_by' => auth()->user()->id,
            'date_of_registration' => now(),
            'date_of_birth' => $householdProfile->birthdate,
            'family_serial_no' => $householdProfile->family_serial_no,
            'complete_name' => $householdProfile->updated_details->firstname . ' ' . $householdProfile->updated_details->lastname,
            'complete_address' => $householdProfile->household->barangay->name . ', ' . $householdProfile->household->barangay->municipality->name . ', ' . $householdProfile->household->barangay->municipality->province->name,
            'age' => now()->diffInYears($householdProfile->birthdate)
        ]);

        return response()->json([
            'message' => 'Family Planning Client registered successfully'
        ], 201);
    }

    public function update(Request $request)
    {
        // add validation later
        // $request->validate([
        //     'id' => 'required',
        //     'complete_name_of_mother' => 'required',
        // ]);
        return DB::transaction(function () use ($request) {
            $clientId = $request->input('id');
            $client = FamilyPlanningClient::find($clientId);
            $client->update($request->only([
                'household_profile_id',
                'encoded_by',
                'date_of_registration',
                'family_serial_no',
                'complete_name',
                'complete_address',
                'age',
                'date_of_birth',
                'type_of_client',
                'source',
                'previous_method',
                'ff_jan',
                'ff_feb',
                'ff_mar',
                'ff_apr',
                'ff_may',
                'ff_jun',
                'ff_jul',
                'ff_aug',
                'ff_sep',
                'ff_oct',
                'ff_nov',
                'ff_dec',
                'dr_date',
                'dr_reason',
                'remarks',
            ]));

            return response()->json([
                'message' => 'Family Planning Client updated successfully'
            ], 200);
        });
    }

    public function delete($id)
    {
        $client = FamilyPlanningClient::find($id);
        if (!$client) {
            return response()->json([
                'message' => 'Family Planning Client not found'
            ], 404);
        }

        $client->delete();

        return response()->json([
            'message' => 'Family Planning Client deleted successfully'
        ], 200);
    }

    public function getClientById($id)
    {
        $client = FamilyPlanningClient::with(['householdProfile.household.barangay.municipality.province'])->find($id);
        if (!$client) {
            return response()->json([
                'message' => 'Family Planning Client not found'
            ], 404);
        }

        return response()->json($client);
    }

}
