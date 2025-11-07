<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HouseholdProfile;
use App\Models\MaternalClient;
use App\Models\MaternalInfectiousDisease;
use App\Models\MaternalSupplement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        return DB::transaction(function () use ($householdProfileId, $householdProfile) {
            $client = MaternalClient::create([
                'household_profile_id' => $householdProfileId,
                'encoded_by' => auth()->user()->id,
                'firstname' => $householdProfile->updated_details->firstname,
                'lastname' => $householdProfile->updated_details->lastname,
                'middlename' => $householdProfile->updated_details->middlename,
                'date_of_registration' => now(),
                'address_barangay_id' => $householdProfile->household->barangay_id
            ]);
            MaternalSupplement::insert([
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 1,
                    'supplement_type' => 'IRON SULFATE'
                ],
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 2,
                    'supplement_type' => 'IRON SULFATE'
                ],
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 3,
                    'supplement_type' => 'IRON SULFATE'
                ],
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 4,
                    'supplement_type' => 'IRON SULFATE'
                ],
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 2,
                    'supplement_type' => 'CALCIUM CARBONATE'
                ],
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 3,
                    'supplement_type' => 'CALCIUM CARBONATE'
                ],
                [
                    'maternal_client_id' => $client->id,
                    'visit_number' => 4,
                    'supplement_type' => 'CALCIUM CARBONATE'
                ],
            ]);
            MaternalInfectiousDisease::insert([
                [
                    'maternal_client_id' => $client->id,
                    'disease' => 'HIV',
                ],
                [
                    'maternal_client_id' => $client->id,
                    'disease' => 'SYPHILIS',
                ],
                [
                    'maternal_client_id' => $client->id,
                    'disease' => 'HEPATITIS B',
                ],
            ]);
            return response()->json([
                'message' => 'Maternal Client registered successfully'
            ]);
        });
    }

    public function getClients()
    {
        $clients = MaternalClient::query()->with(['householdProfile.household.barangay.municipality.province', 'maternalSupplements', 'maternalInfectiousDiseases']);
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

    public function update(Request $request)
    {
        $request->validate([
            'family_serial_no' => 'required',
            'lmp' => 'required',
            'gravida' => 'required',
            'parity' => 'required',
            'edc' => 'required',
            'has_nearby_facility' => 'required',
            'is_hypertensive' => 'required',
        ]);
        return DB::transaction(function () use ($request) {
            $maternalClient = MaternalClient::find($request->id);
            if(!$maternalClient) {
                return response()->json([
                    'message' => 'Maternal Client not found'
                ], 404);
            }
            $maternalClient->update($request->all());
            MaternalSupplement::upsert([
                ...$request->input('maternal_supplements')
            ], ['id'], ['amount', 'given_date']);
            MaternalInfectiousDisease::upsert([
                ...$request->input('maternal_infectious_diseases')
            ], ['id'], ['diagnosis_date', 'is_positive']);
            return response()->json([
                'message' => 'Maternal Client updated successfully'
            ]);
        });
    }

    public function delete($id)
    {
        $maternalClient = MaternalClient::find($id);
        if(!$maternalClient) {
            return response()->json([
                'message' => 'Maternal Client not found'
            ], 404);
        }
        $maternalClient->delete();
        MaternalInfectiousDisease::where('maternal_client_id', $id)->delete();
        MaternalSupplement::where('maternal_client_id', $id)->delete();
        return response()->json([
            'message' => 'Maternal Client deleted successfully'
        ]);
    }
}
