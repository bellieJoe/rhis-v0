<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;

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
        ->where('birthdate', '<=', now()->subYears(1))
        ->doesntHave('childcareClient')
        ->with(['household.barangay.municipality.province']); 

        return response()->json($candidates->paginate(20));
    }
}
