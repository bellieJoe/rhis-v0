<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\HouseholdProfile;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    //
    public function getSummaryReport(Request $request) {
        $year = $request->has('year') ? $request->year : date('Y');
        $barangay = $request->has('barangay') ? $request->barangay : null;
        $sitios = auth()->user()->bhwDesignations->map(function ($bhwDesignation) {
            return $bhwDesignation->sitio_id;
        });
        $data = [
            "actual_population" => $this->actualPopulation($sitios, $year),
            "total_no_of_households" => $this->totalHouseholds($sitios, $year, $barangay),
            "total_no_of_families" => 0,
            "total_no_of_hh_with_sanitary_toilet" => $this->totalHouseholdsWithSanitaryToilet($sitios, $year),
            "total_no_of_hh_without_sanitary_toilet" => $this->totalHouseholdsWithUnsanitaryToilet($sitios, $year),
            "total_no_of_children_male" => $this->totalNumberOfChildren($sitios, $year, 79, '0-19 YEARS'),
            "total_no_of_children_female" => $this->totalNumberOfChildren($sitios, $year, 80, '0-19 YEARS'),
            "zero_to_five_months_male" => $this->totalNumberOfChildren($sitios, $year, 79, '0-5 MONTHS'),
            "zero_to_five_months_female" => $this->totalNumberOfChildren($sitios, $year, 80, '0-5 MONTHS'),
            "six_to_eleven_months_male" => $this->totalNumberOfChildren($sitios, $year, 79, '6-11 MONTHS'),
            "one_to_four_years_male" => $this->totalNumberOfChildren($sitios, $year, 79, '1-4 YEARS'),
            "one_to_four_years_female" => $this->totalNumberOfChildren($sitios, $year, 80, '1-4 YEARS'),
            "five_to_nine_years_male" => $this->totalNumberOfChildren($sitios, $year, 79, '5-9 YEARS'),
            "five_to_nine_years_female" => $this->totalNumberOfChildren($sitios, $year, 80, '5-9 YEARS'),
            "ten_to_nineteen_male" => $this->totalNumberOfChildren($sitios, $year, 79, '10-19 YEARS'),
            "ten_to_nineteen_female" => $this->totalNumberOfChildren($sitios, $year, 80, '10-19 YEARS'),
            "total_no_of_mwra_ten_to_fourteen" => $this->totalNumberWra($sitios, $year, '10-14 YEARS', 74),
            "total_no_of_mwra_fifteen_to_nineteen" => $this->totalNumberWra($sitios, $year, '15-19 YEARS', 74),
            "total_no_of_mwra_twenty_to_fourtynine" => $this->totalNumberWra($sitios, $year, '20-49 YEARS', 74),
            "total_no_of_swra_ten_to_fourteen" => $this->totalNumberWra($sitios, $year, '10-14 YEARS', 75),
            "total_no_of_swra_fifteen_to_nineteen" => $this->totalNumberWra($sitios, $year, '15-19 YEARS', 75),
            "total_no_of_swra_twenty_to_fourtynine" => $this->totalNumberWra($sitios, $year, '20-49 YEARS', 75),
            "total_no_of_pregnant_ten_to_fourteen" => $this->totalNumberPregnant($sitios, $year, '10-14 YEARS'),
            "total_no_of_pregnant_fifteen_to_nineteen" => $this->totalNumberPregnant($sitios, $year, '15-19 YEARS'),
            "total_no_of_pregnant_twenty_to_fourtynine" => $this->totalNumberPregnant($sitios, $year, '20-49 YEARS'),
            "total_no_of_nanganak_ten_to_fourteen" => $this->totalNumberGaveBirth($sitios, $year, '10-14 YEARS'),
            "total_no_of_nanganak_fifteen_to_nineteen" => $this->totalNumberGaveBirth($sitios, $year, '15-19 YEARS'),
            "total_no_of_nanganak_twenty_to_fourtynine" => $this->totalNumberGaveBirth($sitios, $year, '20-49 YEARS'),
            "total_no_of_deliveries_male" => 0,
            "total_no_of_deliveries_female" => 0,
            "total_no_of_live_birth_male" => 0,
            "total_no_of_live_birth_female" => 0,
            "total_no_of_hypertensive_male" => $this->totalHypertensive($sitios, $year, 79),
            "total_no_of_hypertensive_female" => $this->totalHypertensive($sitios, $year, 80),
            "total_no_of_diabetic_male" => $this->totalDiabetic($sitios, $year, 79),
            "total_no_of_diabetic_female" => $this->totalDiabetic($sitios, $year, 80),
            "total_no_of_smokers_male" => $this->totalHc($sitios, $year, 79, 'hc_smoker'),
            "total_no_of_smokers_female" => $this->totalHc($sitios, $year, 80, 'hc_smoker'),
            "total_no_of_drinkers_male" => $this->totalHc($sitios, $year, 79, 'hc_alchohol_drinker'),
            "total_no_of_drinkers_female" => $this->totalHc($sitios, $year, 80, 'hc_alchohol_drinker'),
            "total_no_of_pwd_male" => $this->totalHc($sitios, $year, 79, 'hc_pwd'),
            "total_no_of_pwd_female" => $this->totalHc($sitios, $year, 80, 'hc_pwd'),
            "total_no_of_bed_ridden_male" => 0,
            "total_no_of_bed_ridden_female" => 0,
            "total_no_of_mental_patients_male" => $this->totalHc($sitios, $year, 79, 'hc_mhgap'),
            "total_no_of_mental_patients_female" => $this->totalHc($sitios, $year, 80, 'hc_mhgap'),
            "total_no_of_seniors_male" => $this->totalNumberSenior($sitios, $year, 79),
            "total_no_of_seniors_female" => $this->totalNumberSenior($sitios, $year, 80),
            "total_no_of_cancer_patient_male" => $this->totalHc($sitios, $year, 79, 'hc_cancer'),
            "total_no_of_cancer_patient_female" => $this->totalHc($sitios, $year, 80, 'hc_cancer'),
            "total_no_of_namatay_male" => $this->totalDeaths($sitios, $year, 79),
            "total_no_of_namatay_female" => $this->totalDeaths($sitios, $year, 80),
            "total_no_of_nagkasakit_male" => $this->totalSicks($sitios, $year, 79),
            "total_no_of_nagkasakit_female" => $this->totalSicks($sitios, $year, 80),
            "total_no_of_animal_bites_male" => $this->totalAnimalBites($sitios, $year, 79),
            "total_no_of_animal_bites_female" => $this->totalAnimalBites($sitios, $year, 80),
        ];

        return response()->json((object)$data);
    }

    private function totalHouseholds($sitios, $year){
        return Household::whereHas('sitio', function ($q) use ($sitios) {
            $q->whereIn('id', $sitios);
        })
         ->where('created_at', '<=', $year . '-12-31')
         ->count();
    }

    private function actualPopulation($sitios, $year){
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
            $q->whereIn('sitio_id', $sitios);
        })
         ->where('created_at', '<=', $year . '-12-31')
         ->count();
    }

    private function totalHouseholdsWithSanitaryToilet($sitios, $year)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
            $q->whereIn('sitio_id', $sitios);
        })
        ->whereHas('householdProfileDetails', function ($q) use ($year) {
            $q->whereIn('toilet_facility_type_id', [67, 68, 69])
            ->whereRaw("
                created_at = (
                    SELECT MAX(created_at)
                    FROM household_profile_details
                    WHERE household_profile_details.household_profile_id = household_profiles.id
                    AND created_at <= ?
                )
            ", [$year . '-12-31']);
        })
        ->count();
    }

    private function totalHouseholdsWithUnsanitaryToilet($sitios, $year)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
            $q->whereIn('sitio_id', $sitios);
        })
        ->whereHas('householdProfileDetails', function ($q) use ($year) {
            $q->whereIn('toilet_facility_type_id', [70, 71, 72, 73])
            ->whereRaw("
                created_at = (
                    SELECT MAX(created_at)
                    FROM household_profile_details
                    WHERE household_profile_details.household_profile_id = household_profiles.id
                    AND created_at <= ?
                )
            ", [$year . '-12-31']);
        })
        ->count();
    }

    public function totalHypertensive($sitios, $year, $gender_id)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM household_profile_details
                        WHERE household_profile_details.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->whereHas('highbloodRecords', function ($q) use ($year) {
                $q->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM highblood_records
                        WHERE highblood_records.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalDiabetic($sitios, $year, $gender_id)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM household_profile_details
                        WHERE household_profile_details.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->whereHas('diabetesRecords', function ($q) use ($year) {
                $q->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM diabetes_records
                        WHERE diabetes_records.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalDeaths($sitios, $year, $gender_id)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM household_profile_details
                        WHERE household_profile_details.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->whereHas('deaths', function ($q) use ($year) {
                $q->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM deaths
                        WHERE deaths.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalSicks($sitios, $year, $gender_id)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM household_profile_details
                        WHERE household_profile_details.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->whereHas('sickRecords', function ($q) use ($year) {
                $q->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM sick_records
                        WHERE sick_records.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalAnimalBites($sitios, $year, $gender_id)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM household_profile_details
                        WHERE household_profile_details.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->whereHas('animalBiteRecords', function ($q) use ($year) {
                $q->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM animal_bite_records
                        WHERE animal_bite_records.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalHc($sitios, $year, $gender_id, $column)
    {
        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id, $column) {
                $q->where('gender_id', $gender_id)
                ->where($column, 1)
                ->whereRaw("
                    created_at = (
                        SELECT MAX(created_at)
                        FROM household_profile_details
                        WHERE household_profile_details.household_profile_id = household_profiles.id
                        AND created_at <= ?
                    )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalNumberOfChildren($sitios, $year, $gender_id, $age_group)
    {
        $cutoff = $year . '-12-31';
        $ageCondition = match ($age_group) {
            '0-5 MONTHS' => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') BETWEEN 0 AND 5",
            '6-11 MONTHS' => "TIMESTAMPDIFF(MONTH, birthdate, '{$cutoff}') BETWEEN 6 AND 11",
            '1-4 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 1 AND 4",
            '5-9 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 5 AND 9",
            '10-19 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 19",
            '0-19 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 0 AND 19",
            default => null,
        };

        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->when($ageCondition, fn($query) => $query->whereRaw($ageCondition))
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id, $ageCondition) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM household_profile_details
                            WHERE household_profile_details.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalNumberWra($sitios, $year, $age_group, $civil_status_id)
    {
        $cutoff = $year . '-12-31';
        $ageCondition = match ($age_group) {
            '10-14 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 14",
            '15-19 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 15 AND 19",
            '20-49 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 49",
            default => null,
        };

        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->when($ageCondition, fn($query) => $query->whereRaw($ageCondition))
            ->whereHas('householdProfileDetails', function ($q) use ($year, $civil_status_id, $ageCondition) {
                $q->where('gender_id', 80)
                ->where('civil_status_id', $civil_status_id)
                ->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM household_profile_details
                            WHERE household_profile_details.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalNumberSenior($sitios, $year, $gender_id)
    {
        $cutoff = $year . '-12-31';

        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->when(true, fn($query) => $query->whereRaw("TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 60 AND 200"))
            ->whereHas('householdProfileDetails', function ($q) use ($year, $gender_id) {
                $q->where('gender_id', $gender_id)
                ->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM household_profile_details
                            WHERE household_profile_details.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalNumberPregnant($sitios, $year, $age_group)
    {
        $cutoff = $year . '-12-31';
        $ageCondition = match ($age_group) {
            '10-14 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 14",
            '15-19 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 15 AND 19",
            '20-49 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 49",
            default => null,
        };

        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->when($ageCondition, fn($query) => $query->whereRaw($ageCondition))
            ->whereHas('householdProfileDetails', function ($q) use ($year) {
                $q->where('gender_id', 80)
                ->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM household_profile_details
                            WHERE household_profile_details.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->whereHas('pregnancyRecords', function ($q) use ($year) {
                $q->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM pregnancies
                            WHERE pregnancies.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->count();
    }

    public function totalNumberGaveBirth($sitios, $year, $age_group)
    {
        $cutoff = $year . '-12-31';
        $ageCondition = match ($age_group) {
            '10-14 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 10 AND 14",
            '15-19 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 15 AND 19",
            '20-49 YEARS' => "TIMESTAMPDIFF(YEAR, birthdate, '{$cutoff}') BETWEEN 20 AND 49",
            default => null,
        };

        return HouseholdProfile::whereHas('household', function ($q) use ($sitios) {
                $q->whereIn('sitio_id', $sitios);
            })
            ->when($ageCondition, fn($query) => $query->whereRaw($ageCondition))
            ->whereHas('householdProfileDetails', function ($q) use ($year) {
                $q->where('gender_id', 80)
                ->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM household_profile_details
                            WHERE household_profile_details.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->whereHas('births', function ($q) use ($year) {
                $q->whereRaw("
                        created_at = (
                            SELECT MAX(created_at)
                            FROM births
                            WHERE births.household_profile_id = household_profiles.id
                            AND created_at <= ?
                        )
                ", [$year . '-12-31']);
            })
            ->count();
    }




}
