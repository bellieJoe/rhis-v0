<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseholdProfile extends Model
{
    //
    protected $guarded = [];
    protected $appends = ["updated_details"];

    public function household()
    {
        return $this->belongsTo(Household::class);

    }

    public function householdProfileDetails() {
        return $this->hasMany(HouseholdProfileDetail::class);
    }

    public function getUpdatedDetailsAttribute() {
        return HouseholdProfileDetail::query()->with([...HouseholdProfileDetail::GENERICS_RELATIONS])->where("household_profile_id" , $this->id)
        ->orderBy('created_at', 'desc')->first();
    }

    public function vaccinateds() {
        return $this->hasMany(Vaccinated::class);
    }

    public function deaths() {
        return $this->hasMany(Death::class);
    }

    public function sickRecords() {
        return $this->hasMany(SickRecord::class);
    }

    public function highbloodRecords() {
        return $this->hasMany(HighbloodRecord::class);
    }

    public function cancerRecords() {
        return $this->hasMany(CancerRecord::class);
    }

    public function epilepsyRecords() {
        return $this->hasMany(EpilepsyRecord::class);
    }

    public function animalBiteRecords() {
        return $this->hasMany(AnimalBiteRecord::class);
    }

    public function diabetesRecords() {
        return $this->hasMany(DiabetesRecord::class);
    }

    public function pregnancyRecords() {
        return $this->hasMany(Pregnancy::class);
    }

    public function Births() {
        return $this->hasMany(Birth::class);
    }

    public function medicineMaintenance() {
        return $this->hasMany(MedicationMaintenance::class);
    }

}
