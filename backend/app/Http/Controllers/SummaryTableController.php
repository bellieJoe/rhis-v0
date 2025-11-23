<?php

namespace App\Http\Controllers;

use App\Models\Household;
use Illuminate\Http\Request;

class SummaryTableController extends Controller
{
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";         

    //
    public function getEnvnironmentalSummaryTable(Request $request)
    {
        $barangayIds = $request->input('barangayIds');
        $year = $request->input('year');
        $data = [
            [
                (object)[
                    "label" => "1. No. of HHs with access to basic safe water supply - Total",
                    "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->whereIn('water_source_type_id', [63, 64, 65]);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "a. No. of HHs with Level I - Total",
                    "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->where('water_source_type_id', 63);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "b. No. of HHs with Level II - Total",
                    "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->where('water_source_type_id', 64);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "c. No. of HHs with Level III - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->where('water_source_type_id', 65);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "2. No. of HHs using safely managed drinking-water services - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->whereIn('water_source_type_id', [64, 65]);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "3. No of HHs with basic sanitation facility - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->whereIn('toilet_facility_type_id', [68, 67, 69]);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "a. No. of HH with pour/flush toilet connected to septic tank - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->where('toilet_facility_type_id', 67);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "b. No. of HHs with pour/flush toilet connected to community sewer/ sewerage system or any other approved treatment system-Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->where('toilet_facility_type_id', 68);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "c. No. of HHs with ventilated improved pit latrine (VIP) - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->where('toilet_facility_type_id', 69);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "4. No. of HHs using safely managed sanitation services - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return Household::whereIn('barangay_id', $barangayIds)
                            ->whereHas('householdProfiles', function ($q) use ($year, $type) {
                                $q->whereHas('householdProfileDetails', function ($q) use ($year, $type) {
                                    $q->where('created_at', '=', function ($sub) use ($year, $type) {
                                        $sub->selectRaw('MAX(created_at)')
                                            ->from('household_profile_details')
                                            ->whereColumn('household_profile_id', 'household_profiles.id')
                                            ->where('created_at', '<=', $year .'-'.$type. '-31');
                                    })
                                    ->whereIn('toilet_facility_type_id', [68, 67, 69]);
                                });
                            })
                            ->count();
                    })
                ],
                (object)[
                    "label" => "5a. No. of industrial establishments - Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return 0;
                    })
                ],
            ],
            [
                (object)[
                    "label" => "6. No. of Barangays Declared ZOD-Total",
                    "data" => collect([    "01","02","03","04","05","06","07","08","09","10","11","12", "12"])->map(function($type) use ($barangayIds, $year) {
                        return 0;
                    })
                ],
                
            ],
        ];

        return response()->json($data);
    }
}
