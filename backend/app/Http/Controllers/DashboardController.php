<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GenericType;
use App\Models\Household;
use App\Models\HouseholdProfile;
use App\Models\Vaccinated;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    private $householdProfileQuery;
    private $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";            

    public function getBhwDashboard(Request $request) {
        $name = $request->has('name') ? $request->name : null;
        $sitios = $request->has('sitios') ? $request->sitios : null;
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;
        $this->householdProfileQuery = HouseholdProfile::query()->whereHas('household', function($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            });
        switch ($name) {
            case 'GENDER_DISTRIBUTION':
                return $this->getGenderDistribution($request);
                break;
            case 'CIVIL_STATUS':
                return $this->getCivilStatus($request);
                break;
            case 'WRA':
                return $this->getWra($request);
                break;
            case '4PS_PIE_CHART':
                return $this->getFourpsData($request, $sitios);
                break;
            case 'FAMILY_PLANNING_CHART':
                return $this->getFamilyPlanning($request, $sitios);
                break;
            case 'SENIOR_W_MAINTENANCE':
                return $this->getSeniorCitizenMaintenance($request, $sitios);
                break;
            case "EDUCATIONAL_ATTAINMENT_CHART":
                return $this->getEducationalAttainment($request, $sitios);
                break;
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
            'religionData' => $this->getReligion($request),
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
                [
                    "Name" => "20-59 YEARS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 20 AND 59')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 79);
                        })->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 20 AND 59')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })->count(),
                ],
                [
                    "Name" => "60+ YEARS",
                    "Male" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) >= 60')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 79);
                        })->count(),
                    "Female" => (clone $this->householdProfileQuery)
                        ->whereRaw('TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) >= 60')
                        ->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
                            $q->whereRaw($latesDetailQueryString)->where("gender_id", 80);
                        })->count(),
                ],
            ],
            "familyCount" => $this->getFamilyCount($request, $sitios),
            "totalPopulation" => $this->getTotalPopulationData($request, $sitios),
            "fourpsData" => $this->getFourpsData($request, $sitios),
            "householdsVisited" => $this->getHouseholdsVisited($request, $sitios),
            "familyPlanning" => $this->getFamilyPlanning($request, $sitios),
        ]);
    }

    private function getGenderDistribution($request)
    {
        $age_group = $request->has('age_group') ? $request->age_group : null;
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;
        $dateQuery = $start && $end && Carbon::parse($start) < Carbon::parse($end) ? " AND created_at BETWEEN '{$start}' AND '{$end}'" : '';
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
                ->whereRaw($ageCondition.$dateQuery)
                ->count()
            ],
                (object)[
                "name" => "Female",
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition.$dateQuery)
                ->count()
            ]
        ];
    }

    private function getCivilStatus($request) 
    {
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;
        $dateQuery = $start && $end && Carbon::parse($start) < Carbon::parse($end) ? " AND created_at BETWEEN '{$start}' AND '{$end}'" : '';
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
                ->whereRaw($ageCondition.$dateQuery)
                ->count(),
                "married" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 74)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition.$dateQuery)
                ->count(),
                "widowed" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 76)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition.$dateQuery)
                ->count(),
                "separated" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 77)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition.$dateQuery)
                ->count(),
                "cohabitation" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("civil_status_id", 78)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw($ageCondition.$dateQuery)
                ->count(),
            ]
        ];
    }

    public function getWra($request)
    {
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;
        $dateQuery = $start && $end && Carbon::parse($start) < Carbon::parse($end) ? " AND created_at BETWEEN '{$start}' AND '{$end}'" : '';
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
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 14".$dateQuery)
                ->count()
            ],
            (object)[
                "name" => '15-19',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 15 AND 19".$dateQuery)
                ->count()
            ],
            (object)[
                "name" => '20-49',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 49".$dateQuery)
                ->count()
            ],
            (object)[
                "name" => '50+',
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString, $civil_status) {
                    $q->where("civil_status_id", $civil_status)
                    ->where("gender_id", 80)
                    ->whereRaw($latesDetailQueryString);
                })
                ->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') >= 50".$dateQuery)
                ->count()
            ],
        ];
    }

    public function getFamilyCount($request, $sitios) 
    {
        $latesDetailQueryString = $this->latesDetailQueryString;
        return (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function ($q) use ($latesDetailQueryString) {
            $q->whereRaw($latesDetailQueryString)
            ->where('member_relationship_id', 1);
        })
        ->whereHas('household', function ($q) use ($sitios) {
            $q->whereIn('sitio_id', $sitios);
        })
        ->count();
    }

    public function getTotalPopulationData($request, $sitios) 
    {
        return (clone $this->householdProfileQuery)->whereHas('household', function ($q) use ($sitios) {
            $q->whereIn('sitio_id', $sitios);
        })->count();
    }

    public function getFourpsData($request, $sitios) 
    {
        $householdProfileQuery = $this->householdProfileQuery;
        $latesDetailQueryString = $this->latesDetailQueryString;
        return [
            (object)[
                "name" => "4p's Members",
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("fourps_member", 1)
                    ->whereRaw($latesDetailQueryString);
                })
                ->count()
            ],
            (object)[
                "name" => "Non 4p's Members",
                "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                    $q->where("fourps_member", 0)
                    ->whereRaw($latesDetailQueryString);
                })
                ->count()
            ]
        ]; 
    }

    public function getHouseholdsVisited($request, $sitios) 
    {

    }

    public function getFamilyPlanning($request, $sitios) 
    {
        $types = GenericType::where('type', 'FAMILY_PLANNING_METHOD')->get();
        return $types->map(function($type) use ($sitios) {
            return (object)[
                "Name" => $type->name,
                "Total" => (clone $this->householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($type, $sitios) {
                    $q->where('family_planning_method_id', $type->id)
                    ->where('is_using_fp_method', 1)
                    ->whereRaw($this->latesDetailQueryString);
                })
                ->whereHas('household', function ($q) use ($sitios) {
                    $q->whereIn('sitio_id', $sitios);
                })
                ->count()
            ];
        });
    }

    public function getSeniorCitizenMaintenance($request, $sitios) {
        $cutoff = $request->has('end') ? $request->end : date('Y') . '-12-31';
        $meds = [
            ['name' => 'Losartan', 'type' => 'hypertension', 'ignore' => ['amlodipine','losartan']],
            ['name' => 'Amlodipine', 'type' => 'hypertension', 'ignore' => ['amlodipine','losartan']],
            ['name' => 'Metformin', 'type' => 'diabetes', 'ignore' => ['metformin']],
            ['name' => 'Others', 'type' => 'both']
        ];

        return collect($meds)->map(function($med) use ($sitios, $cutoff) {
            $query = clone $this->householdProfileQuery;
            $query->whereHas('household', fn($q) => $q->whereIn('sitio_id', $sitios));

            if($med['type'] === 'hypertension') {
                $query->whereHas('householdProfileDetails', fn($q) => $q->whereRaw("
                    created_at = (
                        select max(hpd.created_at)
                        from household_profile_details hpd
                        where hpd.household_profile_id = household_profiles.id
                        and hpd.created_at <= ?
                        and LOWER(hpd.hypertension_maintenance) = ?
                    )
                ", [$cutoff, strtolower($med['name'])]));
            } elseif($med['type'] === 'diabetes') {
                $query->whereHas('householdProfileDetails', fn($q) => $q->whereRaw("
                    created_at = (
                        select max(hpd.created_at)
                        from household_profile_details hpd
                        where hpd.household_profile_id = household_profiles.id
                        and hpd.created_at <= ?
                        and LOWER(hpd.diabetes_maintenance) = ?
                    )
                ", [$cutoff, strtolower($med['name'])]));
            } else { // Others
                $query->whereHas('householdProfileDetails', fn($q) => $q->whereRaw("
                    created_at = (
                        select max(hpd.created_at)
                        from household_profile_details hpd
                        where hpd.household_profile_id = household_profiles.id
                        and hpd.created_at <= ?
                        and (
                            (hpd.hypertension_maintenance IS NOT NULL AND LOWER(hpd.hypertension_maintenance) NOT IN ('amlodipine','losartan'))
                            OR
                            (hpd.diabetes_maintenance IS NOT NULL AND LOWER(hpd.diabetes_maintenance) NOT IN ('metformin'))
                        )
                    )
                ", [$cutoff]));
            }

            return (object)[
                'Name' => $med['name'],
                'Value' => $query->count()
            ];
        });

    }   

    public function getEducationalAttainment($request, $sitios)
    {
        $member_filter = $request->memberFilter ?? null;
        $start = $request->start ?? null;
        $end = $request->end ?? null;

        $latestSubquery = DB::table('household_profile_details as hpd')
            ->select('hpd.*', 'hp.created_at as profile_created_at')
            ->join(DB::raw('(
                SELECT household_profile_id, MAX(created_at) AS max_created
                FROM household_profile_details
                GROUP BY household_profile_id
            ) t'), function ($join) {
                $join->on('t.household_profile_id', '=', 'hpd.household_profile_id')
                    ->on('t.max_created', '=', 'hpd.created_at');
            })
            ->join('household_profiles as hp', 'hp.id', '=', 'hpd.household_profile_id')
            ->join('households as h', 'h.id', '=', 'hp.household_id')
            ->join('sitios as s', 's.id', '=', 'h.sitio_id');

        // ✅ sitio filter
        if (is_array($sitios)) {
            $latestSubquery->whereIn('s.id', $sitios);
        } else {
            $latestSubquery->where('s.id', $sitios);
        }

        // ✅ member filter
        if ($member_filter) {
            $latestSubquery->where('member_relationship_id', $member_filter);
        }

        // ✅ date filter (applied correctly)
        if ($start && $end && Carbon::parse($start)->lte(Carbon::parse($end))) {
            $latestSubquery->whereBetween('hp.created_at', [
                Carbon::parse($start)->startOfDay(),
                Carbon::parse($end)->endOfDay(),
            ]);
        }

        // ✅ final aggregation
        $result = DB::table('generic_types as gt')
            ->select('gt.id', 'gt.name', DB::raw('COUNT(latest.id) AS total'))
            ->leftJoinSub($latestSubquery, 'latest', function ($join) {
                $join->on('latest.educational_attainment_id', '=', 'gt.id');
            })
            ->where('gt.type', 'EDUCATIONAL_ATTAINMENT')
            ->groupBy('gt.id', 'gt.name')
            ->orderByDesc('total')
            ->limit(3)
            ->get();

        return $result;
    }

    private function getReligion($request)
    {
        $sitios = $request->has('sitios') ? $request->sitios : null;

        // Build sitio filter dynamically
        $sitioFilter = '';
        if ($sitios) {
            if (is_array($sitios)) {
                // Convert array into comma-separated quoted values for raw SQL
                $sitioIds = implode(',', array_map('intval', $sitios));
                $sitioFilter = "WHERE s.id IN ($sitioIds)";
            } else {
                $sitioId = (int)$sitios;
                $sitioFilter = "WHERE s.id = $sitioId";
            }
        }

        return DB::select("
            WITH latest AS (
                SELECT hpd.*
                FROM household_profile_details hpd
                INNER JOIN (
                    SELECT household_profile_id, MAX(created_at) AS max_created
                    FROM household_profile_details
                    GROUP BY household_profile_id
                ) t 
                    ON t.household_profile_id = hpd.household_profile_id 
                    AND t.max_created = hpd.created_at
                INNER JOIN household_profiles hp ON hp.id = hpd.household_profile_id
                INNER JOIN households h ON h.id = hp.household_id
                INNER JOIN sitios s ON s.id = h.sitio_id
                $sitioFilter
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
        ");
    }

    public function getMidwifeDashboard(Request $request)
    {
        $barangayIds = $request->input('barangayIds', []);
        $name = $request->has('name') ? $request->name : null;
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;

        switch($name) {
            case 'all':
                return $this->getMidwifeDashboardData($request);
                break;
            default:
                return $this->getMidwifeDashboardData($request);
                break;
        }
    }

    private function getMidwifeDashboardData(Request $request)
    {

    }


}
