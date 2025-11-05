<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HouseholdProfile;
use App\Models\MaternalClient;
use Illuminate\Http\Request;

class MaternalClientController extends Controller
{
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";         
    //
    public function getCandidates(Request $request)
    {
        $barangays = auth()->user()->midwifeBarangays->pluck('id')->toArray();

        $candidates = HouseholdProfile::whereHas('household', function($q) use ($barangays) {
            $q->whereIn('barangay_id', $barangays);
        })
        ->whereHas('householdProfileDetails', function($q) {
            $q->whereRaw($this->latesDetailQueryString)
            ->where('is_pregnant', 1)
            ->where('gender_id', 80);
        })
        ->with(['household.barangay.municipality.province']); 

        return response()->json($candidates->paginate(20));
    }

    public function register() 
    {
        $householdProfileId = request('household_profile_id');
        if(!$householdProfileId) {
            return response()->json([
                'message' => 'Household Profile ID is required'
            ], 400);
        }
        $householdProfile = HouseholdProfile::find($householdProfileId);
        if(!$householdProfile) {
            return response()->json([
                'message' => 'Household Profile not found'
            ], 404);
        }
        MaternalClient::create([
            'household_profile_id' => $householdProfileId,
            'encoded_by' => auth()->user()->id,
            'firstname' => $householdProfile->updated_details->firstname,
            'lastname' => $householdProfile->updated_details->lastname,
            'middlename' => $householdProfile->updated_details->middlename,
            'date_of_registration' => now(),
            'address_barangay_id' => $householdProfile->household->barangay_id
        ]);
        return response()->json([
            'message' => 'Maternal Client registered successfully'
        ]);
    }

    public function getClients()
    {
        $clients = MaternalClient::query()->with(['householdProfile.household.barangay.municipality.province']);
        return response()->json($clients->paginate(15));
    }

    public function getClientById($id)
    {
        $maternalClient = MaternalClient::find($id);
        if(!$maternalClient) {
            return response()->json([
                'message' => 'Maternal Client not found'
            ], 404);
        }
        return response()->json($maternalClient);
    }
}
