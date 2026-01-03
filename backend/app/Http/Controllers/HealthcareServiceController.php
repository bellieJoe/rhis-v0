<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AnimalBiteRecord;
use App\Models\Birth;
use App\Models\CancerRecord;
use App\Models\Death;
use App\Models\DiabetesRecord;
use App\Models\EpilepsyRecord;
use App\Models\FpRecord;
use App\Models\HighbloodRecord;
use App\Models\HouseholdProfile;
use App\Models\MedicationMaintenance;
use App\Models\NewBorn;
use App\Models\Pregnancy;
use App\Models\SickRecord;
use App\Models\UrinalysisResult;
use App\Models\Vaccinated;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HealthcareServiceController extends Controller
{
    //
    public function storePregnant(Request $request) {
        //
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "last_menstrual_period" => "required|date",
            "date_of_giving_birth" => "required|date",
            "number_of_pregnancy" => "required|numeric|min:1",
            "age" => "required|numeric|min:1"
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            $updated_profile_detail = $household_profile->updated_details;
            $new_details = $updated_profile_detail->replicate();
            $new_details->last_menstrual_period = Carbon::parse($request->last_menstrual_period);
            $new_details->is_pregnant = true;
            $new_details->save();
            $pregnancy = Pregnancy::create([
                "household_profile_id" => $request->household_profile_id,
                "last_menstrual_period" => Carbon::parse($request->last_menstrual_period),
                "date_of_giving_birth" => Carbon::parse($request->date_of_giving_birth),
                "number_of_pregnancy" => $request->number_of_pregnancy,
                "age" => $request->age,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Pregnancy created successfully",
            ], 201);
        });
    }

    public function storeBirthRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "date_gave_birth" => "required|date",
            "midwife" => "required|max:100",
            "place_of_birth" => "required|exists:barangays,id",
            "type_of_birth" => "required",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            $updated_profile_detail = $household_profile->updated_details;
            $new_details = $updated_profile_detail->replicate();
            $new_details->last_menstrual_period = null;
            $new_details->is_pregnant = false;
            $new_details->save();
            $pregnancy = Birth::create([
                "household_profile_id" => $request->household_profile_id,
                "date_gave_birth" => Carbon::parse($request->date_gave_birth),
                "midwife" => $request->midwife,
                "place_of_birth" => $request->place_of_birth,
                "type_of_birth" => $request->type_of_birth,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Birth Record created successfully",
            ], 201);
        });
    }

    public function storeNewBornRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "date_of_birth" => "required|date",
            "place_of_birth" => "required|exists:barangays,id",
            "weight" => "required",
            "gender" => "required|exists:generic_types,id",
            "remarks" => "nullable|max:500",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            NewBorn::create([
                "household_profile_id" => $request->household_profile_id,
                "date_of_birth" => Carbon::parse($request->date_gave_birth),
                "place_of_birth" => $request->place_of_birth,
                "weight" => $request->weight,
                "gender_id" => $request->gender,
                "encoded_by" => auth()->user()->id,
                "remarks" => $request->remarks
            ]);
            return response()->json([
                "message" => "New Born Record created successfully",
            ], 201);
        });
    }
    
    public function storeVaccinatedRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "vaccine" => "required|max:100",
            "date_vaccinated" => "required|date",
        ]);

        return DB::transaction(function () use ($request) {
            Vaccinated::create([
                "household_profile_id" => $request->household_profile_id,
                "vaccine" => $request->vaccine,
                "encoded_by" => auth()->user()->id,
                "date_vaccinated" => Carbon::parse($request->date_vaccinated),
            ]);
            return response()->json([
                "message" => "Vaccine Record created successfully",
            ], 201);
        });
    }

    public function storeFpRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "family_planning_method" => "required|exists:generic_types,id",
            "remarks" => "nullable|max:500",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            $updated_profile_detail = $household_profile->updated_details;
            $new_details = $updated_profile_detail->replicate();
            $new_details->is_using_fp_method = true;
            $new_details->family_planning_method_id = $request->family_planning_method;
            $new_details->save();
            FpRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "fp_method_id" => $request->family_planning_method,
                "remarks" => $request->remarks,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Vaccine Record created successfully",
            ], 201);
        });
    }

    public function storeDeathRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "date_of_death" => "required|date",
            "cause_of_death" => "nullable|max:100",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            Death::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "date_of_death" => Carbon::parse($request->date_of_death),
                "cause_of_death" => $request->cause_of_death,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Death Record created successfully",
            ], 201);
        });
    }

    public function storeSickRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "date_of_sickness" => "required|date",
            "type_of_sickness" => "required|max:100",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            SickRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "date_of_sick" => Carbon::parse($request->date_of_sickness),
                "type_of_sickness" => $request->type_of_sickness,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Sickness Record created successfully",
            ], 201);
        });
    }

    public function storeHighbloodRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "blood_pressure" => "required",
            "actions" => "required|max:500",
            "bp_count" => "required|numeric",
        ]);

        return DB::transaction(function () use ($request) {
            HighbloodRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "blood_pressure" => $request->blood_pressure,
                "actions" => $request->actions,
                "bp_counts" => $request->bp_count,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Highblood Record created successfully",
            ], 201);
        });
    }
    
     public function storeDiabetesRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "glucose_level" => "required",
            "observation" => "required|max:500",
            "actions" => "required|max:500",
        ]);

        return DB::transaction(function () use ($request) {
            DiabetesRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "glucose_level" => $request->glucose_level,
                "observation" => $request->observation,
                "actions" => $request->actions,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Diabetes Record created successfully",
            ], 201);
        });
    }

    public function storeUrinalysisResult(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "results" => "required"
        ]);

        return DB::transaction(function () use ($request) {
            UrinalysisResult::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "results" => $request->results,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Urinalysis Record created successfully",
            ], 201);
        });
    }

    public function storeCancerRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "affected_areas" => "required|max:500",
            "actions" => "required|max:500",
        ]);

        return DB::transaction(function () use ($request) {
            $household_profile = HouseholdProfile::find($request->household_profile_id);
            $updated_profile_detail = $household_profile->updated_details;
            $new_details = $updated_profile_detail->replicate();
            $new_details->hc_cancer = true;
            $new_details->save();
            CancerRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "affected_areas" => $request->affected_areas,
                "actions" => $request->actions,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Cancer Record created successfully",
            ], 201);
        });
    }

    public function storeEpilepsyRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric"
        ]);

        return DB::transaction(function () use ($request) {
            EpilepsyRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Epilepsy Record created successfully",
            ], 201);
        });
    }

    public function storeAnimalBiteRecord(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "age" => "required|numeric",
            "animal_type" => "required",
            "other_animal_type" => "nullable|required_if:animal_type,96",
            "date_bitten" => "required|date"
        ]);

        return DB::transaction(function () use ($request) {
            AnimalBiteRecord::create([
                "household_profile_id" => $request->household_profile_id,
                "age" => $request->age,
                "animal_type" => $request->animal_type,
                "encoded_by" => auth()->user()->id,
                "other_animal_type" => $request->animal_type == 96 ? $request->other_animal_type : null,
                "date_bitten" => Carbon::parse($request->date_bitten)
            ]);
            return response()->json([
                "message" => "Animal Bite Record created successfully",
            ], 201);
        });
    }

    public function storeMedication(Request $request) {
        $request->validate([
            "household_profile_id" => "required|exists:household_profiles,id",
            "medication_id" => "required|exists:generic_types,id",
            "other_medication" => "nullable|required_if:medication_id,93"
        ]);

        return DB::transaction(function () use ($request) {
            MedicationMaintenance::create([
                "household_profile_id" => $request->household_profile_id,
                "medication_id" => $request->medication_id,
                "other_medication" => $request->medication_id == 93 ? $request->other_medication : null,
                "encoded_by" => auth()->user()->id
            ]);
            return response()->json([
                "message" => "Drug Maintenance successfully saved",
            ], 201);
        });
    }

    public function getMonthlyRecords(Request $request) {
        $records = (object)[
            "pregnancyRecords" => $this->queryRecord(Pregnancy::class, $request),
            "birthRecords" => $this->queryRecord(Birth::class, $request),
            "newBornRecords" => $this->queryRecord(NewBorn::class, $request),
            "vaccinatedRecords" => $this->queryRecord(Vaccinated::class, $request),
            "familyPlanningRecords" => $this->queryRecord(FpRecord::class, $request),
            "deathRecords" => $this->queryRecord(Death::class, $request),
            "sickRecords" => $this->queryRecord(SickRecord::class, $request),
            "highbloodRecords" => $this->queryRecord(HighbloodRecord::class, $request),
            "diabetesRecords" => $this->queryRecord(DiabetesRecord::class, $request),
            "urinalysisResultRecords" => $this->queryRecord(UrinalysisResult::class, $request),
            "cancerRecords" => $this->queryRecord(CancerRecord::class, $request),
            "epilepsyRecords" => $this->queryRecord(EpilepsyRecord::class, $request),
            "animalBiteRecords" => $this->queryRecord(AnimalBiteRecord::class, $request),
        ];
        return response()->json($records);
    }

    private function queryRecord($model, $request) {
        $query = $model::query();
        $query->with('household_profile.household');
        if($request->has('month')) {
            $query->whereMonth('created_at', $request->month);
        }
        if($request->has('year')) {
            $query->whereYear('created_at', $request->year);
        }
        if($request->has('barangay')) {
            $query->whereHas('household_profile', function ($q) use ($request) {
                    $q->whereHas('household', function ($q) use ($request) {
                        $q->where('barangay_id', $request->barangay);
                    });
            });
        }
        if($request->has("sitio")) {
            $query->whereHas('household_profile', function ($q) use ($request) {
                    $q->whereHas('household', function ($q) use ($request) {
                        $q->where('sitio_id', $request->sitio);
                    });
            });
        }
        // to avoid duplicates
        $query->whereIn('id', function($sub) use ($model) {
            $sub->selectRaw('MIN(id)')
                ->from((new $model)->getTable())
                ->groupBy('household_profile_id');
        });
        return $query->get();
    }

}
