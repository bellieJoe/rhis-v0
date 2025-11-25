<?php

namespace App\Http\Controllers;

use App\Models\FamilyPlanningClient;
use App\Models\Household;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log as FacadesLog;

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

    private function getFpCounts($methodIds, $barangayIds, $type, $year, $day)
    {
        $months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
        $ages = ["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"];

        return collect($months)->map(function($month) use ($barangayIds, $year, $type, $methodIds, $ages, $day) {
            return collect($ages)->map(function($age) use ($barangayIds, $year, $month, $type, $methodIds, $day) {

                return FamilyPlanningClient::query()
                    ->where("type_of_client", $type)
                    ->whereHas("householdProfile", function($q) use ($barangayIds, $year, $month, $age, $methodIds, $day) {

                        $q->whereHas("household", function($hh) use ($barangayIds) {
                            $hh->whereIn("barangay_id", $barangayIds);
                        });

                        $q->whereRaw("
                            TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31')
                            BETWEEN {$age}
                        ");

                        $q->whereHas('householdProfileDetails', function($d) use ($methodIds, $year, $month, $day) {
                            $lastDay = $day == "31" ? Carbon::parse("{$year}-{$month}-01")->endOfMonth()->toDateString() : "{$year}-{$month}-{$day}";

                            $d->whereIn('family_planning_method_id', (array)$methodIds)
                            ->where('created_at', function($query) use ($lastDay) {
                                $query->selectRaw('MAX(created_at)')
                                        ->from('household_profile_details')
                                        ->whereColumn('household_profile_id', 'household_profiles.id')
                                        ->where('created_at', '<=', $lastDay);
                            });
                        });
                    })
                    ->count();

            });
        });
    }

    private function getDropoutFpCounts($methodIds, $barangayIds, $year, $day)
    {
        $months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
        $ages = ["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"];

        return collect($months)->map(function($month) use ($barangayIds, $year, $methodIds, $ages, $day) {
            return collect($ages)->map(function($age) use ($barangayIds, $year, $month, $methodIds, $day) {

                return FamilyPlanningClient::query()
                    ->whereBetween("dr_date", [
                        "{$year}-{$month}-01",
                        "{$year}-{$month}-31"
                    ])
                    ->whereHas("householdProfile", function($q) use ($barangayIds, $year, $month, $age, $methodIds, $day) {

                        $q->whereHas("household", function($hh) use ($barangayIds) {
                            $hh->whereIn("barangay_id", $barangayIds);
                        });

                        $q->whereRaw("
                            TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-{$day}')
                            BETWEEN {$age}
                        ");

                        $q->whereHas('householdProfileDetails', function($d) use ($methodIds, $year, $month, $day) {
                            $lastDay = $day == "31" ? Carbon::parse("{$year}-{$month}-01")->endOfMonth()->toDateString() : "{$year}-{$month}-{$day}";

                            $d->whereIn('family_planning_method_id', (array)$methodIds)
                            ->where('created_at', function($query) use ($lastDay) {
                                $query->selectRaw('MAX(created_at)')
                                        ->from('household_profile_details')
                                        ->whereColumn('household_profile_id', 'household_profiles.id')
                                        ->where('created_at', '<=', $lastDay);
                            });
                        });
                    })
                    ->count();

            });
        });
    }

    public function getFamilyPlanningSummaryTable(Request $request) {
        $barangayIds = $request->input('barangayIds');
        $year = $request->input('year');
        $fpMethods = [
            ["label" => "a. Bilateral Tubal Ligation (BTL) - Total", "ids" => [51]],
            ["label" => "b. No-Scalpel Vasectomy (NSV) - Total", "ids" => [0]],
            ["label" => "c. Condom – Total", "ids" => [49]],
            ["label" => "d. Pills (POP & COC)- Total", "ids" => [45,46]],
            ["label" => "d.1. Pills-POP - Total", "ids" => [46]],
            ["label" => "d.2. Pills-COC - Total", "ids" => [45]],
            ["label" => "e. Injectables (DMPA/CIC) - Total", "ids" => [47]],
            ["label" => "f. Implant - Total", "ids" => [52]],
            ["label" => "g. IUD (I & PP)- Total", "ids" => [48]],
            ["label" => "g.1. IUD-I - Total", "ids" => [48]],
            ["label" => "g.2. IUD-PP - Total", "ids" => [48]],
            ["label" => "h. NFP-LAM - Total", "ids" => [50]],
            ["label" => "i. NFP-BBT – Total", "ids" => [0]],
            ["label" => "j. NFP-CMM - Total", "ids" => [0]],
            ["label" => "k. NFP-STM – Total", "ids" => [0]],
            ["label" => "l. NFP-SDM - Total", "ids" => [53]],
        ];
        $data = [
            ...collect([FamilyPlanningClient::TYPE_CURRENT_USER])
            ->map(function($type) use ($fpMethods, $barangayIds, $year) {

                return collect($fpMethods)->map(function($item) use ($barangayIds, $year, $type) {
                    return (object) [
                        "label" => $item["label"],
                        "data"  => $this->getFpCounts($item["ids"], $barangayIds, $type, $year, "01")
                    ];
                });

            }),
            ...collect([ FamilyPlanningClient::TYPE_NEW_ACCEPTOR, FamilyPlanningClient::TYPE_OTHER_ACCEPTORS])
            ->map(function($type) use ($fpMethods, $barangayIds, $year) {

                return collect($fpMethods)->map(function($item) use ($barangayIds, $year, $type) {
                    return (object) [
                        "label" => $item["label"],
                        "data"  => $this->getFpCounts($item["ids"], $barangayIds, $type, $year, "31")
                    ];
                });

            }),
            [
                ...collect($fpMethods)->map(function($item) use ($barangayIds, $year) {
                    return (object) [
                        "label" => $item["label"],
                        "data"  => $this->getDropoutFpCounts($item["ids"], $barangayIds, $year, "31")
                    ];
                })
            ],
            ...collect([FamilyPlanningClient::TYPE_CURRENT_USER])
            ->map(function($type) use ($fpMethods, $barangayIds, $year) {

                return collect($fpMethods)->map(function($item) use ($barangayIds, $year, $type) {
                    return (object) [
                        "label" => $item["label"],
                        "data"  => $this->getFpCounts($item["ids"], $barangayIds, $type, $year, "31")
                    ];
                });

            }),
        ];

        return $data;
    }

    // public function getFamilyPlanningSummaryTable(Request $request) {
    //     $barangayIds = $request->input('barangayIds');
    //     $year = $request->input('year');
    //     $data = [
    //         ...collect([FamilyPlanningClient::TYPE_CURRENT_USER])->map(function($type) use ($barangayIds, $year) {
    //             return [
    //                 (object)[
    //                     "label" => "a. Bilateral Tubal Ligation (BTL) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 51)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "b. No-Scalpel Vasectomy (NSV) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 0)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "c. Condom – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 49)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d. Pills (POP & COC)- Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->whereIn("family_planning_method_id", [45, 46])
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d.1. Pills-POP - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 46)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d.2. Pills-COC - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 45)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "e. Injectables (DMPA/CIC) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 47)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "f. Implant - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 52)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g. IUD (I & PP)- Total",
    //                    "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g.1. IUD-I - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g.2. IUD-PP - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "h. NFP-LAM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 50)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "i. NFP-BBT – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "j. NFP-CMM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "k. NFP-STM – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-1');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "l. NFP-SDM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 53)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
                    
    //             ];
    //         }),
    //         ...collect([ FamilyPlanningClient::TYPE_NEW_ACCEPTOR, FamilyPlanningClient::TYPE_OTHER_ACCEPTORS])->map(function($type) use ($barangayIds, $year) {
    //             return [
    //                 (object)[
    //                     "label" => "a. Bilateral Tubal Ligation (BTL) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 51)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "b. No-Scalpel Vasectomy (NSV) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 0)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "c. Condom – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 49)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d. Pills (POP & COC)- Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->whereIn("family_planning_method_id", [45, 46])
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d.1. Pills-POP - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 46)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d.2. Pills-COC - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 45)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "e. Injectables (DMPA/CIC) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 47)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "f. Implant - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 52)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g. IUD (I & PP)- Total",
    //                    "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g.1. IUD-I - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g.2. IUD-PP - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "h. NFP-LAM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 50)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "i. NFP-BBT – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "j. NFP-CMM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "k. NFP-STM – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "l. NFP-SDM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 53)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
                    
    //             ];
    //         }),
    //         [
    //             (object)[
    //                 "label" => "a. Bilateral Tubal Ligation (BTL) - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 51)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "b. No-Scalpel Vasectomy (NSV) - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 0)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "c. Condom – Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 49)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "d. Pills (POP & COC)- Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->whereIn("family_planning_method_id", [45, 46])
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "d.1. Pills-POP - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 46)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "d.2. Pills-COC - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 45)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "e. Injectables (DMPA/CIC) - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 47)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "f. Implant - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 52)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "g. IUD (I & PP)- Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 48)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "g.1. IUD-I - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 48)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "g.2. IUD-PP - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 48)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "h. NFP-LAM - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 50)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "i. NFP-BBT – Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 00)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "j. NFP-CMM - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 00)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "k. NFP-STM – Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 00)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //             (object)[
    //                 "label" => "l. NFP-SDM - Total",
    //                 "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year) {
    //                     return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month) {
    //                         return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age) {
    //                             $q->whereHas('household', function($q) use ($barangayIds) {
    //                                 $q->whereIn('barangay_id', $barangayIds);
    //                             })
    //                             ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                             ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                 $q->where("family_planning_method_id", 53)
    //                                 ->selectRaw('MAX(created_at)')
    //                                 ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                             });
    //                         })
    //                         ->whereBetween('dr_date', [$year .'-'.$month. '-01', $year .'-'.$month. '-31'])
    //                         ->count();
    //                     });
    //                 })
    //             ],
    //         ],
    //         ...collect([FamilyPlanningClient::TYPE_CURRENT_USER])->map(function($type) use ($barangayIds, $year) {
    //             return [
    //                 (object)[
    //                     "label" => "a. Bilateral Tubal Ligation (BTL) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 51)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "b. No-Scalpel Vasectomy (NSV) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 0)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "c. Condom – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 49)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d. Pills (POP & COC)- Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->whereIn("family_planning_method_id", [45, 46])
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d.1. Pills-POP - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 46)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "d.2. Pills-COC - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 45)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "e. Injectables (DMPA/CIC) - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 47)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "f. Implant - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 52)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g. IUD (I & PP)- Total",
    //                    "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g.1. IUD-I - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "g.2. IUD-PP - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 48)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "h. NFP-LAM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 50)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "i. NFP-BBT – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "j. NFP-CMM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "k. NFP-STM – Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 00)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
    //                 (object)[
    //                     "label" => "l. NFP-SDM - Total",
    //                     "data" => collect(["01","02","03","04","05","06","07","08","09","10","11","12"])->map(function($month) use ($barangayIds, $year, $type) {
    //                         return collect(["10 AND 14", "15 AND 19", "20 AND 49", "10 AND 49"])->map(function($age) use ($barangayIds, $year, $month, $type) {
    //                             return FamilyPlanningClient::whereHas('householdProfile', function($q) use ($barangayIds, $year, $month, $age, $type) {
    //                                 $q->whereHas('household', function($q) use ($barangayIds) {
    //                                     $q->whereIn('barangay_id', $barangayIds);
    //                                 })
    //                                 ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$year}-{$month}-31}') BETWEEN {$age}")
    //                                 ->whereHas('householdProfileDetails', function($q) use ($month, $year) {
    //                                     $q->where("family_planning_method_id", 53)
    //                                     ->selectRaw('MAX(created_at)')
    //                                     ->where('created_at', '<=', $year .'-'.$month. '-31');
    //                                 });
    //                             })
    //                             ->where("type_of_client", $type)
    //                             ->count();
    //                         });
    //                     })
    //                 ],
                    
    //             ];
    //         }),
    //     ];

    //     return $data;
    // }
}
