<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\HouseholdProfile;
use App\Models\Vaccinated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    private $householdProfileQuery;
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";            

    public function getBhwDashboard(Request $request) {
        $name = $request->has('name') ? $request->name : null;
        $sitios = $request->has('sitios') ? $request->sitios : null;
        $this->householdProfileQuery = HouseholdProfile::query()->whereHas('household', function($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            });
        switch ($name) {
            case 'GENDER_DISTRIBUTION':
                return $this->getGenderDistribution($request);
                break;
            case 'CIVIL_STATUS':
                return $this->getCivilStatus($request);
            case 'WRA':
                return $this->getWra($request);
            default:
                return $this->getBhwDashboardFull($request);
                break;
        }
    }

    public function getBhwDashboardFull(Request $request)
    {
        $sitios = $request->has('sitios') ? $request->sitios : null;
        $latesDetailQueryString = $this->latesDetailQueryString;
        return response([
            "households" => Household::whereIn('sitio_id', $sitios)->count(),
            "pregnancy" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->where('is_pregnant', true)
                ->whereRaw($latesDetailQueryString);
            })
            ->count(),
            'vaccinated' => (clone $this->householdProfileQuery)->whereHas('vaccinateds')->count(),
            'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths')->count(),
            'genderData' => $this->getGenderDistribution($request),
            'civilStatusData' => $this->getCivilStatus($request),
            'educationalAttainmentData' => DB::select("
                WITH latest AS (
                    SELECT hpd.*
                    FROM household_profile_details hpd
                    INNER JOIN (
                        SELECT household_profile_id, MAX(created_at) AS max_created
                        FROM household_profile_details
                        GROUP BY household_profile_id
                    ) t ON t.household_profile_id = hpd.household_profile_id 
                    AND t.max_created = hpd.created_at
                )
                SELECT 
                    gt.id,
                    gt.name,
                    COUNT(latest.id) AS total
                FROM generic_types gt
                LEFT JOIN latest 
                    ON latest.educational_attainment_id = gt.id
                WHERE gt.type = 'EDUCATIONAL_ATTAINMENT'
                GROUP BY gt.id, gt.name
                ORDER BY total DESC
                LIMIT 3
            "),
            'religionData' => DB::select("
                WITH latest AS (
                    SELECT hpd.*
                    FROM household_profile_details hpd
                    INNER JOIN (
                        SELECT household_profile_id, MAX(created_at) AS max_created
                        FROM household_profile_details
                        GROUP BY household_profile_id
                    ) t ON t.household_profile_id = hpd.household_profile_id 
                    AND t.max_created = hpd.created_at
                )
                SELECT 
                    gt.id,
                    gt.name,
                    COUNT(latest.id) AS total
                FROM generic_types gt
                LEFT JOIN latest 
                    ON latest.religion_id = gt.id
                WHERE gt.type = 'RELIGION'
                GROUP BY gt.id, gt.name
                ORDER BY total DESC
            "),
            'vaccinationPermonthData' => [
                [
                    'name' => 'January',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 1)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'February',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 2)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'March',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 3)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'April',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 4)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'May',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 5)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'June',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 6)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'July',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 7)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'August',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 8)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'September',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 9)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'October',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 10)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'November',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 11)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'December',
                    'value' => (clone $this->householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 12)->whereYear('created_at', date('Y'));
                    })->count()
                ]
                ],
            'deathRateIllnessData' => [
                    [
                    'name' => 'January',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 1)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 1)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'February',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 2)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 2)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'March',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 3)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 3)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'April',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 4)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 4)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'May',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 5)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 5)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'June',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 6)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 6)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'July',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 7)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 7)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'August',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 8)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 8)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'September',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 9)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 9)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'October',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 10)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 10)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'November',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 11)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 11)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'December',
                    'deaths' => (clone $this->householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 12)
                        ->whereYear('created_at', date('Y'));
                    })->count(),
                    'ills' => (clone $this->householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 12)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ] 
            ],
            'illnessData' => [
                [
                    "name" => "Highblood",
                    "Total" => (clone $this->householdProfileQuery)->whereHas('highbloodRecords')->count()
                ],
                [
                    "name" => "Diabetes",
                    "Total" => (clone $this->householdProfileQuery)->whereHas('diabetesRecords')->count()
                ],
                [
                    "name" => "Cancer",
                    "Total" => (clone $this->householdProfileQuery)->whereHas('cancerRecords')->count()
                ],
                [
                    "name" => "Animal Bites",
                    "Total" => (clone $this->householdProfileQuery)->whereHas('animalBiteRecords')->count()
                ],
                [
                    "name" => "Epilepsy",
                    "Total" => (clone $this->householdProfileQuery)->whereHas('epilepsyRecords')->count()
                ]
            ],
            "toiletData" => (object)[
                "sanitary_toilet" => Household::whereHas('householdProfiles', function($q) use ($latesDetailQueryString) {
                    $q->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->whereRaw($latesDetailQueryString)
                        ->whereIn('toilet_facility_type_id', [67,68,69]);
                    });
                })->count(),
                "unsanitary_toilet" => Household::whereHas('householdProfiles', function($q) use ($latesDetailQueryString) {
                    $q->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->whereRaw($latesDetailQueryString)
                        ->whereIn('toilet_facility_type_id', [70,71,72,73]);
                    });
                })->count()
            ],
            "philhealthMemberCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('philheath_membership_type_id', 81);
            })->count(),
            "asthmaCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_asthma', 1);
            })->count(),
            "cancerCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_cancer', 1);
            })->count(),
            "pwdCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_pwd', 1);
            })->count(),
            "strokeCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_stroke', 1);
            })->count(),
            "massCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_mass', 1);
            })->count(),
            "mhgapCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_mhgap', 1);
            })->count(),
            "smokerCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_smoker', 1);
            })->count(),
            "alchoholicCount" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_alchohol_drinker', 1);
            })->count(),
            "typeOfVaccineData" => Vaccinated::whereHas('household_profile', function ($q) use ($latesDetailQueryString, $sitios) {
                $q->whereHas('household', function ($q) use ($sitios) {
                    $q->whereIn('sitio_id', $sitios);
                });
            })
            ->select('vaccine', DB::raw('COUNT(*) as total'))
            ->groupBy('vaccine')
            ->get(),
            'ageCategories' => [
                [
                    "Name" => "0-5 MONTHS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(MONTH, birthdate, CURDATE()) BETWEEN 0 AND 5')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->where("gender_id", 79);
                        })
                        ->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(MONTH, birthdate, CURDATE()) BETWEEN 0 AND 5')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })
                        ->count(),
                ],
                [
                    "Name" => "6-11 MONTHS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(MONTH, birthdate, CURDATE()) BETWEEN 6 AND 11')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 79);
                        })->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(MONTH, birthdate, CURDATE()) BETWEEN 6 AND 11')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })->count(),
                ],
                [
                    "Name" => "1-4 YEARS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 1 AND 4')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 79);
                        })->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 1 AND 4')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })->count(),
                ],
                [
                    "Name" => "5-9 YEARS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 5 AND 9')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 79);
                        })->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 5 AND 9')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })->count(),
                ],
                [
                    "Name" => "10-19 YEARS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 10 AND 19')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 79);
                        })->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 10 AND 19')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })->count(),
                ],
            ]
        ]);
    }

    private function getGenderDistribution($request)
    {
        $age_group = $request->has('age_group') ? $request->age_group : null;
        $householdProfileQuery = $this->householdProfileQuery;
        $latesDetailQueryString = $this->latesDetailQueryString;
        $cutoff = date('Y') . '-12-31';
        $ageCondition = match ($age_group) {
            '1' => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') BETWEEN 0 AND 5",
            '2' => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') BETWEEN 6 AND 11",
            '3' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 1 AND 4",
            '4' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 5 AND 9",
            '5' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 19",
            '6' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 59",
            '7' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') >= 60",
            default => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') >= 0",
        };
        return [
                (object)[
                "name" => "Male",
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("gender_id", 79)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count()
            ],
                (object)[
                "name" => "Female",
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count()
            ]
        ];
    }

    private function getCivilStatus($request) 
    {
        $age_group = $request->has('age_group') ? $request->age_group : null;
        $latesDetailQueryString = $this->latesDetailQueryString;
        $cutoff = date('Y') . '-12-31';
        $ageCondition = match ($age_group) {
            '1' => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') BETWEEN 0 AND 5",
            '2' => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') BETWEEN 6 AND 11",
            '3' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 1 AND 4",
            '4' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 5 AND 9",
            '5' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 19",
            '6' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 59",
            '7' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') >= 60",
            default => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') >= 0",
        };
        return [
            (object)[
                "name" => "Civil Status",
                "single" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 75)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count(),
                "married" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 74)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count(),
                "widowed" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 76)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count(),
                "separated" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 77)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count(),
                "cohabitation" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 78)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition)
                ->count(),
            ]
        ];
    }

    public function getWra($request)
    {
        $civil_status = $request->has('civil_status') ? $request->civil_status : null;
        $householdProfileQuery = $this->householdProfileQuery;
        $latesDetailQueryString = $this->latesDetailQueryString;
        $cutoff = date('Y') . '-12-31';
        return [
            (object)[
                "name" => '10-14',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 14")
                ->count()
            ],
            (object)[
                "name" => '15-19',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 15 AND 19")
                ->count()
            ],
            (object)[
                "name" => '20-49',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 49")
                ->count()
            ],
            (object)[
                "name" => '50+',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') >= 50")
                ->count()
            ],
        ];
    }
}
