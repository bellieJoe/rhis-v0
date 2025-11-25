<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MidwifeDashboardController extends Controller
{
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";
    //
    public function getMidwifeDashboard(Request $request) 
    {
        $name = $request->has('name') ? $request->name : null;
        $barangayIds = $request->has('barangayIds') ? $request->barangayIds : null;
        $start = $request->has('start') ? $request->start : Carbon::parse(date('Y').'-01-01')->toDateString();
        $end = $request->has('end') ? $request->end : Carbon::parse(date('Y').'-12-31')->toDateString();

        switch ($name) {
            case "ALL":
                return $this->getMidwifeDashboardData($request);
                break;
            default:
                return $this->getMidwifeDashboardData($request);
                break;
        }
    }

    private function getHouseholdProfilesQuery($barangayIds = [])
    {
        $query = HouseholdProfile::whereHas('household', function($q) use ($barangayIds) {
            if (!empty($barangayIds)) {
                $q->whereIn('barangay_id', $barangayIds);
            }
        });

        return $query;
    }   


    private function getMidwifeDashboardData(Request $request, $barangayIds = [], $start = null, $end = null)
    {
        $data = (object)[
            "totalPopulation" => $this->getHouseholdProfilesQuery($barangayIds)->count(),
            "totalPregnants" => $this->getHouseholdProfilesQuery($barangayIds)->whereHas('householdProfileDetails', function($q) use ($start, $end) {
                $q->where('is_pregnant', true);
                $q->where("created_at", "<=", $end);
                $q->whereRaw($this->latesDetailQueryString);
            })->count(),
            "totalFamilyPlanners" => $this->getHouseholdProfilesQuery($barangayIds)->whereHas('familyPlanningClients', function($q) use ($start, $end) {
                $q->whereYear("date_of_registration", Carbon::parse($end)->format("Y"));
            })->count(),
            "totalChildren" => $this->getHouseholdProfilesQuery($barangayIds)->whereRaw("TIMESTAMPDIFF(MONTH, birthdate, '{$end}') BETWEEN 0 AND 12")->count(),
        ];
    }
}
