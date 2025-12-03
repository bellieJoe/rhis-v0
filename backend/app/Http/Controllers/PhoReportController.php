<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Office;
use Illuminate\Http\Request;

class PhoReportController extends Controller
{
    private $latestDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";

    
    //
    public function environmental(Request $request)
    {
        $start = $request->has('start') ? $request->start : now()->startOfMonth()->format('Y-m-d');
        $end = $request->has('end') ? $request->end : now()->endOfMonth()->format('Y-m-d');
        $office_id = $request->has('office') ? $request->office : null;
        // $data = Office::query()
        //     ->with('parent', 'barangay.municipality.province')
        //     ->whereHas('barangay')
        //     ->withCount([
        //         'barangay.households as c1' => function ($q) use ($end) {
        //             $q->where('created_at', '<=', $end);
        //         }
        //     ])
        //     ->where('office_type', 'barangay')   
        //     ->where('parent_id', $office_id)
        //     ->get();

        $data = Office::query()
        ->with('parent', 'barangay.municipality.province')
        ->select('offices.*')

        // c1 = ALL households in the barangay
        ->selectSub(function ($q) use ($end) {
            $q->from('households')
                ->join('barangays', 'households.barangay_id', '=', 'barangays.id')
                ->whereColumn('barangays.id', 'offices.barangay_id')
                ->where('households.created_at', '<=', $end)
                ->selectRaw('COUNT(households.id)');
        }, 'c1')

        // c2 = households with water source types 63/64/65 AND meeting the profile conditions
        ->selectSub(function ($q) use ($end) {

            $q->from('households')
                ->join('barangays', 'households.barangay_id', '=', 'barangays.id')
                ->join('household_profiles', 'household_profiles.household_id', '=', 'households.id')
                ->join('household_profile_details', 'household_profile_details.household_profile_id', '=', 'household_profiles.id')

                ->whereColumn('barangays.id', 'offices.barangay_id')
                
                ->where('household_profiles.created_at', '<=', $end)
                ->where('household_profile_details.created_at', '<=', $end)

                ->whereIn('household_profile_details.water_source_type_id', [63, 64, 65])

                // IMPORTANT: Apply your latest details filter
                ->whereRaw('household_profile_details.created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)')

                ->selectRaw('COUNT(DISTINCT households.id)');
        }, 'c2')

        ->selectSub(function ($q) use ($end) {

            $q->from('households')
                ->join('barangays', 'households.barangay_id', '=', 'barangays.id')
                ->join('household_profiles', 'household_profiles.household_id', '=', 'households.id')
                ->join('household_profile_details', 'household_profile_details.household_profile_id', '=', 'household_profiles.id')

                ->whereColumn('barangays.id', 'offices.barangay_id')
                
                ->where('household_profiles.created_at', '<=', $end)
                ->where('household_profile_details.created_at', '<=', $end)

                ->whereIn('household_profile_details.water_source_type_id', [65])

                // IMPORTANT: Apply your latest details filter
                ->whereRaw('household_profile_details.created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)')

                ->selectRaw('COUNT(DISTINCT households.id)');
        }, 'c3')

        ->selectSub(function ($q) use ($end) {

            $q->from('households')
                ->join('barangays', 'households.barangay_id', '=', 'barangays.id')
                ->join('household_profiles', 'household_profiles.household_id', '=', 'households.id')
                ->join('household_profile_details', 'household_profile_details.household_profile_id', '=', 'household_profiles.id')

                ->whereColumn('barangays.id', 'offices.barangay_id')
                
                ->where('household_profiles.created_at', '<=', $end)
                ->where('household_profile_details.created_at', '<=', $end)

                ->whereIn('household_profile_details.toilet_facility_type_id', [67, 68, 69])

                // IMPORTANT: Apply your latest details filter
                ->whereRaw('household_profile_details.created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)')

                ->selectRaw('COUNT(DISTINCT households.id)');
        }, 'c4')

        ->where('office_type', 'barangay')
        ->where('parent_id', $office_id)
        ->get();



        return $data;
    }
}
