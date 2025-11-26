<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MidwifeDashboardController extends Controller
{
    private $latestDetailQueryString = "created_at = (select max(created_at) from household_profile_details where household_profile_details.household_profile_id = household_profiles.id)";            
    //
    public function getMidwifeDashboard(Request $request) 
    {
        $name = $request->has('name') ? $request->name : null;
        $barangayIds = $request->has('barangayIds') ? $request->barangayIds : null;
        $start = $request->has('start') ? $request->start : Carbon::parse(date('Y').'-01-01')->toDateString();
        $end = $request->has('end') ? $request->end : Carbon::parse(date('Y').'-12-31')->toDateString();

        switch ($name) {
            case 'PREGNANT_WOMEN_CHART':
                return $this->getPregnantWomanChartData($request);
                break;
            case 'CHILD_CARE_WEIGHT_STATUS_CHART':
                return $this->getChildcareStatusChartData($request);
                break;
            case 'CHILD_CARE_NEWBORN_CHART':
                return $this->getChildcareNewbornChartData($request);
                break;
            case 'ALL':
                return $this->getMidwifeDashboardData($request, $barangayIds, $start, $end);
                break;
            default:
                return $this->getMidwifeDashboardData($request, $barangayIds, $start, $end);
                break;
        }
    }

    private function getHouseholdProfileQuery($barangayIds)
    {
        return HouseholdProfile::query()->whereHas('household', function ($q) use ($barangayIds){
            $q->whereIn('barangay_id', $barangayIds);
        });
    }

    private function getMidwifeDashboardData(Request $request, $barangayIds, $start, $end)
    {
        $data = (object)[
            "totalPopulation" => $this->getHouseholdProfileQuery($barangayIds)->count(),
            "totalPregnants" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end) {
                $q->whereRaw($this->latestDetailQueryString);
                $q->where('is_pregnant', 1);
                $q->where("created_at", "<=", $end);
            })->count(),
            "totalChildren" => $this->getHouseholdProfileQuery($barangayIds)->whereRaw("TIMESTAMPDIFF(MONTH, birthdate, '{$end}') BETWEEN 0 AND 12")->count(),
            "totalFamilyPlanning" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end) {
                $q->whereRaw($this->latestDetailQueryString);
                $q->where('is_using_fp_method', 1);
                $q->whereBetween("created_at", [$start, $end]);
            })->count(),
            "hhWithBasicWaterSupply" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end) {
                $q->whereRaw($this->latestDetailQueryString);
                $q->whereIn('water_source_type_id', [63, 64, 65]);
                $q->where("created_at", "<=", $end);
            })->count(),
            "hhWithSafelyManagedwaterSupply" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end) {
                $q->whereRaw($this->latestDetailQueryString);
                $q->whereIn('water_source_type_id', [63, 64, 65]);
                $q->where("created_at", "<=", $end);
            })->count(),
            "hhWithBasicSanitation" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end) {
                $q->whereRaw($this->latestDetailQueryString);
                $q->whereIn('toilet_facility_type_id', [67, 68, 69, 70]);
                $q->where("created_at", "<=", $end);
            })->count(),
            "hhWithSafelyManagedSanitation" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end) {
                $q->whereRaw($this->latestDetailQueryString);
                $q->whereIn('toilet_facility_type_id', [67, 68, 69, 70]);
                $q->where("created_at", "<=", $end);
            })->count(),

        ];
        return $data;
    }

    private function getPregnantWomanChartData(Request $request)
    {
        $name = $request->has('name') ? $request->name : null;
        $barangayIds = $request->has('barangayIds') ? $request->barangayIds : null;
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;
        $mapping = [
            [
                "label" => "10-14",
                "value" => "10 AND 14"
            ],
            [
                "label" => "15-19",
                "value" => "15 AND 19"
            ],
            [
                "label" => "20-49",
                "value" => "20 AND 49"
            ],
        ];
        return collect($mapping)->map(function($item) use ($barangayIds, $start, $end) {
            return [
                "Name" => $item['label'],
                "Total" => $this->getHouseholdProfileQuery($barangayIds)->whereHas('householdProfileDetails', function ($q) use ($start, $end, $item) {
                    $q->whereRaw($this->latestDetailQueryString);
                    $q->where('is_pregnant', 1);
                    $q->whereBetween("created_at", [$start, $end]);
                    $q->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$end}') BETWEEN {$item['value']}");
                })->count()
            ];
        });
    }

    private function getChildcareStatusChartData(Request $request)
    {
        $barangayIds = $request->input('barangayIds', null);
        $end = $request->input('end', now()->toDateString());
        $ageGroup = $request->input('ageGroup', 1);

        $endDate = Carbon::parse($end)->format('Y-m-d');

        $mapping = [
            [
                "label" => "S – stunted",
                "ageGroup1" => [0, 1.9],   // 1–3 months
                "ageGroup2" => [0, 6],     // 6–11 months
                "ageGroup3" => [0, 7],     // 12 months
            ],
            [
                "label" => "W-MAM – Wasted MAM",
                "ageGroup1" => [3.01, 3.9],
                "ageGroup2" => [6.01, 6.74],
                "ageGroup3" => [7.01, 8.9],
            ],
            [
                "label" => "W-SAM – Wasted SAM",
                "ageGroup1" => [2.0, 3.0],
                "ageGroup2" => [5.0, 6.0],
                "ageGroup3" => [6.0, 7.0],
            ],
            [
                "label" => "O – obese/overweight",
                "ageGroup1" => [5.01, INF],
                "ageGroup2" => [10.01, INF],
                "ageGroup3" => [12.01, INF],
            ],
            [
                "label" => "N – normal",
                "ageGroup1" => [4.0, 5.0],
                "ageGroup2" => [7.5, 10.0],
                "ageGroup3" => [9.0, 12.0],
            ],
        ];

        // Map age group to weight column and age range
        $ageGroupColumnMap = [
            1 => ['column' => 'nsa_weight_13', 'minMonth' => 1, 'maxMonth' => 3],
            2 => ['column' => 'nsa_weight_611', 'minMonth' => 6, 'maxMonth' => 11],
            3 => ['column' => 'nsa_weight_12', 'minMonth' => 12, 'maxMonth' => 13],
        ];

        $column = $ageGroupColumnMap[$ageGroup]['column'];
        $minMonth = $ageGroupColumnMap[$ageGroup]['minMonth'];
        $maxMonth = $ageGroupColumnMap[$ageGroup]['maxMonth'];

        return collect($mapping)->map(function ($item) use ($barangayIds, $endDate, $column, $minMonth, $maxMonth, $ageGroup) {
            $weightRange = $item['ageGroup' . $ageGroup];

            return [
                'Name' => $item['label'],
                'Total' => $this->getHouseholdProfileQuery($barangayIds)
                    ->whereHas('childcareClient', function ($q) use ($weightRange, $column) {
                        $q->whereBetween($column, $weightRange);
                    })
                    ->whereRaw("TIMESTAMPDIFF(MONTH, birthdate, ?) BETWEEN ? AND ?", [$endDate, $minMonth, $maxMonth])
                    ->count()
            ];
        });
    }

    private function getChildcareNewbornChartData(Request $request)
    {
        $barangayIds = $request->input('barangayIds', null);
        $end = $request->input('end', now()->toDateString());

        $endDate = Carbon::parse($end)->format('Y-m-d');

        $mapping = [
            [
                "label" => "Low",
                "value" => [0, 2], 
            ],
            [
                "label" => "Normal",
                "value" => [2.01, INF],
            ],
            [
                "label" => "Unknown",
                "value" => [null, null],
            ]
        ];

        return collect($mapping)->map(function ($item) use ($barangayIds, $endDate) {
            return (object)[
                'Name' => $item['label'],
                'Total' => $this->getHouseholdProfileQuery($barangayIds)
                    ->whereHas('childcareClient', function ($q) use ($item) {
                        $q->whereBetween('weight', $item['value']);
                    })
                    ->whereRaw("TIMESTAMPDIFF(DAY, birthdate, ?) BETWEEN 0 AND 28", [$endDate])
                    ->count()
                ];
        });
    }



}
