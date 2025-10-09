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
            "total_no_of_children" => 0,
            "zero_to_five_months_male" => 0,
            "zero_to_five_months_female" => 0,
            "six_to_eleven_months_male" => 0,
            "six_to_eleven_months_female" => 0,
            "one_to_four_years_male" => 0,
            "one_to_four_years_female" => 0,
            "five_to_nine_years_male" => 0,
            "five_to_nine_years_female" => 0,
            "ten_to_nineteen_male" => 0,
            "ten_to_nineteen_female" => 0,
            "total_no_of_mwra_ten_to_fourteen" => 0,
            "total_no_of_mwra_fifteen_to_nineteen" => 0,
            "total_no_of_mwra_twenty_to_fourtynine" => 0,
            "total_no_of_swra_ten_to_fourteen" => 0,
            "total_no_of_swra_fifteen_to_nineteen" => 0,
            "total_no_of_swra_twenty_to_fourtynine" => 0,
            "total_no_of_pregnant_ten_to_fourteen" => 0,
            "total_no_of_pregnant_fifteen_to_nineteen" => 0,
            "total_no_of_pregnant_twenty_to_fourtynine" => 0,
            "total_no_of_nanganak_ten_to_fourteen" => 0,
            "total_no_of_nanganak_fifteen_to_nineteen" => 0,
            "total_no_of_nanganak_twenty_to_fourtynine" => 0,
            "total_no_of_deliveries_male" => 0,
            "total_no_of_deliveries_female" => 0,
            "total_no_of_live_birth_male" => 0,
            "total_no_of_live_birth_female" => 0,
            "total_no_of_hypertensive_male" => 0,
            "total_no_of_hypertensive_female" => 0,
            "total_no_of_diabetic_male" => 0,
            "total_no_of_diabetic_female" => 0,
            "total_no_of_smokers_male" => 0,
            "total_no_of_smokers_female" => 0,
            "total_no_of_drinkers_male" => 0,
            "total_no_of_drinkers_female" => 0,
            "total_no_of_pwd_male" => 0,
            "total_no_of_pwd_female" => 0,
            "total_no_of_bed_ridden_male" => 0,
            "total_no_of_bed_ridden_female" => 0,
            "total_no_of_mental_patients_male" => 0,
            "total_no_of_mental_patients_female" => 0,
            "total_no_of_seniors_male" => 0,
            "total_no_of_seniors_female" => 0,
            "total_no_of_cancer_patient_male" => 0,
            "total_no_of_cancer_patient_female" => 0,
            "total_no_of_namatay_male" => 0,
            "total_no_of_namatay_female" => 0,
            "total_no_of_nagkasakit_male" => 0,
            "total_no_of_nagkasakit_female" => 0,
            "total_no_of_animal_bites_male" => 0,
            "total_no_of_animal_bites_female" => 0,
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

    public function totalHypertensive() {
        
    }


}
