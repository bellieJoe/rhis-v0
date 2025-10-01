<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //
    public function getBhwDashboard(Request $request){
        // $bar
        // $households = Household::all();
        $sitio = $request->has('sitio') ? $request->sitio : null;
        $householdProfileQuery = HouseholdProfile::query()->whereHas('household', function($q) use ($sitio) {
                $q->where('sitio_id', $sitio);
            });
        $latesDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";
        return response([
            "households" => Household::where('sitio_id', $sitio)->count(),
            "pregnancy" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->where('is_pregnant', true)
                ->whereRaw($latesDetailQueryString);
            })
            ->count(),
            'vaccinated' => (clone $householdProfileQuery)->whereHas('vaccinateds')->count(),
            'deaths' => (clone $householdProfileQuery)->whereHas('deaths')->count(),
            'genderData' =>[
                 (object)[
                    "name" => "Male",
                    "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("gender_id", 79)
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                 (object)[
                    "name" => "Female",
                    "value" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("gender_id", 80)
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ]
            ],
            'civilStatusData' => [
                (object)[
                    "name" => "Civil Status",
                    "single" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("civil_status_id", 75)
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    "married" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("civil_status_id", 74)
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    "widowed" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("civil_status_id", 76)
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    "separated" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("civil_status_id", 77)
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    "cohabitation" => (clone $householdProfileQuery)->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                        $q->where("civil_status_id", 78)
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                ]
            ],
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
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 1)
                        ->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'February',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 2)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'March',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 3)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'April',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 4)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'May',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 5)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'June',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 6)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'July',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 7)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'August',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 8)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'September',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 9)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'October',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 10)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'November',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 11)->whereYear('created_at', date('Y'));
                    })->count()
                ],
                [
                    'name' => 'December',
                    'value' => (clone $householdProfileQuery)->whereHas('vaccinateds', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 12)->whereYear('created_at', date('Y'));
                    })->count()
                ]
                ],
            'deathRateIllnessData' => [
                    [
                    'name' => 'January',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 1)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 1)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'February',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 2)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 2)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'March',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 3)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 3)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'April',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 4)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 4)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'May',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 5)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 5)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'June',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 6)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 6)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'July',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 7)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 7)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'August',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 8)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 8)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'September',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 9)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 9)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'October',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 10)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 10)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'November',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 11)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 11)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ],
                [
                    'name' => 'December',
                    'deaths' => (clone $householdProfileQuery)->whereHas('deaths', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 12)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count(),
                    'ills' => (clone $householdProfileQuery)->whereHas('sickRecords', function($q) use ($latesDetailQueryString) {
                        $q->whereMonth('created_at', 12)
                        ->whereYear('created_at', date('Y'))
                        ->whereRaw($latesDetailQueryString);
                    })->count()
                ] 
            ],
            'illnessData' => [
                [
                    "name" => "Highblood",
                    "Total" => (clone $householdProfileQuery)->whereHas('highbloodRecords')->count()
                ],
                [
                    "name" => "Diabetes",
                    "Total" => (clone $householdProfileQuery)->whereHas('diabetesRecords')->count()
                ],
                [
                    "name" => "Cancer",
                    "Total" => (clone $householdProfileQuery)->whereHas('cancerRecords')->count()
                ],
                [
                    "name" => "Animal Bites",
                    "Total" => (clone $householdProfileQuery)->whereHas('animalBiteRecords')->count()
                ],
                [
                    "name" => "Epilepsy",
                    "Total" => (clone $householdProfileQuery)->whereHas('epilepsyRecords')->count()
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
            "philhealthMemberCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('philheath_membership_type_id', 81);
            })->count(),
            "asthmaCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_asthma', 1);
            })->count(),
            "cancerCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_cancer', 1);
            })->count(),
            "pwdCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_pwd', 1);
            })->count(),
            "strokeCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_stroke', 1);
            })->count(),
            "massCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_mass', 1);
            })->count(),
            "mhgapCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_mhgap', 1);
            })->count(),
            "smokerCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_smoker', 1);
            })->count(),
            "alchoholicCount" => $householdProfileQuery->whereHas('householdProfileDetails', function($q) use ($latesDetailQueryString) {
                $q->whereRaw($latesDetailQueryString)
                ->where('hc_alchohol_drinker', 1);
            })->count(),
        ]);
    }
}
