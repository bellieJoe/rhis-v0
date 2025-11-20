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
        // ->doesntHave('maternalClient', function($q){
        //     $q->where
        // })
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

    public function getSummaryTable(Request $request)
    {
        $barangayIds = $request->input('barangay_ids', []);
        // $ageGroupQueries = [
        //     [
                
        //     ]
        //     ];
        $table = [
            [
                [

                    "label" => "1. No. of pregnant women with at least 4 prenatal check-ups - Total",
                    // "data" => [

                    // ]
                ],
                [
                    "label" => "2. No. of pregnant women assessed of their nutritional status during the 1st trimester - Total",
                ],
                [
                    "label" => "a. Number of pregnant women seen in the first trimester who have normal BMI -Total",
                ],
                [
                    "label" => "b. No. of pregnant women seen in the first trimester who have low BMI - Total",
                ],
                [
                    "label" => "c. No. of pregnant women seen in the first trimester who have high BMI - Total",
                ],
                [
                    "label" => "3. No. of pregnant women for the first time given at least 2 doses of Td vaccination - Total",
                ],
                [
                    "label" => "4. No. of pregnant women for the 2nd or more times given at least 3 doses of Td vaccination (Td2 Plus) - Total",
                ],
                [
                    "label" => "5. No. of pregnant women who completed the dose of iron with folic acid supplementation - Total",
                ],
                [
                    "label" => "6. No. of pregnant women who completed doses of calcium carbonate supplementation - Total",
                ],
                [
                    "label" => "7. No. of pregnant women given iodine capsules – Total",
                ],
            ],
            [
                [
                    "label" => "8. No. of pregnant women given one dose of deworming tablet - Total",
                ],
                [
                    "label" => "9. No. of pregnant women screened for syphilis - Total",
                ],
                [
                    "label" => "10. No. of pregnant women tested positive for syphilis - Total",
                ],
                [
                    "label" => "11. No. of pregnant women screened for Hepatitis B - Total",
                ],
                [
                    "label" => "12. No. of pregnant women tested positive for Hepatitis B - Total",
                ],
                [
                    "label" => "13. No. of pregnant women screened for HIV - Total",
                ],
                [
                    "label" => "14. No. of pregnant women tested for CBC or Hgb&Hct count-Total",
                ],
                [
                    "label" => "15.No. of pregnant women tested for CBC or Hgb & Hct count diagnosed with anemia - Total",
                ],
                [
                    "label" => "16. No. of pregnant women screened for gestational diabetes – Total",
                ],
                [
                    "label" => "17. No. of pregnant women tested positive for gestational diabetes – Total",
                ],
            ],
            [
                [
                    "label" => "18. No. of deliveries -Total",
                ],
                [
                    "label" => "19. No. of live births -Total",
                ],
                [
                    "label" => "20. No. of live births by birth weight - Total",
                ],
                [
                    "label" => "a. No. of live births with normal birth weight-Tot.",
                ],
            ],
            [
                [
                    "label" => "b1. No. of live births with low birth weight - Male",
                ],
                [
                    "label" => "b2. No. of live births with low birth weight - Female",
                ],
                [
                    "label" => "c. No. of live births with unknown birth weight- Total",
                ],
                [
                    "label" => "21. No. of deliveries attended by skilled health professionals - Total",
                ],
                [
                    "label" => "a. No. of deliveries attended by a physician",
                ],
                [
                    "label" => "b. No. of deliveries attended by a nurse",
                ],
                [
                    "label" => "c. No. of deliveries attended by midwives",
                ],
                [
                    "label" => "22. No. of health facility-based deliveries - Total",
                ],
                [
                    "label" => "23. No. of deliveries by health facility ownership - Total",
                ],
                [
                    "label" => "a. No. of deliveries in public health facility - Total",
                ],
                [
                    "label" => "b. No. of deliveries in private health facility - Total",
                ],
                [
                    "label" => "24. No. of non-facility-based deliveries - Total",
                ],
                
                
            ],
            [
                [
                    "label" => "a. No. of vaginal deliveries – Total",
                ],
                [
                    "label" => "b. No. of deliveries by CS – Total",
                ],
            ],
            [
                [
                    "label" => "a. No. of full-term births",
                ],
                [
                    "label" => "b. No. of pre-term births",
                ],
                [
                    "label" => "c. No. of fetal deaths",
                ],
                [
                    "label" => "d. No. of abortion/ miscarriage",
                ],
            ],
            [
                [
                    "label" => "27. No. of postpartum women together with their newborn who completed at least 2 postpartum check-ups - Total",
                ],
                [
                    "label" => "28. No. of postpartum women who completed iron with folic acid supplementation-Total",
                ],
                [
                    "label" => "29. No. of postpartum women with Vitamin A supplementation - Total",
                ],
            ],
            [
                [
                    "label" => "28. No. of pregnant women who were diagnosed with hypertension - Total",
                ],
                [
                    "label" => "29. No. of women who gave birth who has access the closest birthing facility within 2 hours - Total",
                ],
                [
                    "label" => "30a. No. of deliveries with 4ANC – Total",
                ],
                [
                    "label" => "30b. No. of deliveries with 1ANC during 1st trimester – Total",
                ],
                [
                    "label" => "31. No. of women who gave birth for the 1st time - Total",
                ],
                [
                    "label" => "32. No. of women who gave birth who are Grand Multigravida (G5 and above) - Total",
                ],
            ]
        ];
        return $table;
    }
}
