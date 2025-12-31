<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class HouseholdProfile extends Model
{
    //
    protected $guarded = [];
    protected $appends = ["updated_details", "fullname", "is_dead", "already_gave_birth", "is_senior", "is_pregnant"];

    public function household()
    {
        return $this->belongsTo(Household::class, "household_id", "id");
    }

    public function maternalClients()
    {
        return $this->hasMany(MaternalClient::class);
    }

    public function childcareClient()
    {
        return $this->hasOne(ChildcareClient::class, "household_profile_id", "id");
    }

    public function householdProfileDetails() {
        return $this->hasMany(HouseholdProfileDetail::class);
    }

    public function getUpdatedDetailsAttribute() {
        return HouseholdProfileDetail::query()->with([...HouseholdProfileDetail::GENERICS_RELATIONS])->where("household_profile_id" , $this->id)
        ->orderBy('created_at', 'desc')->first();
    }

    public function getFullnameAttribute() {
        return $this->updated_details->firstname . " " . $this->updated_details->lastname;
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

    public function familyPlanningClients()
    {
        return $this->hasMany(FamilyPlanningClient::class);
    }

    public function getIsDeadAttribute() {
        return $this->deaths()->count() > 0;
    }

    public function getAlreadyGaveBirthAttribute()
    {
        $pregnancy = Pregnancy::where('household_profile_id', $this->id)
            ->latest()
            ->first();

        if(!$pregnancy) {
            return true;
        }

        if (!$pregnancy->date_of_giving_birth) {
            return true;
        }

        return Carbon::parse($pregnancy->date_of_giving_birth)->isPast();
    }

    public function getIsSeniorAttribute(): bool
    {
        return $this->updated_details?->birthdate
            ? Carbon::parse($this->updated_details->birthdate)
                ->addYears(60)
                ->isPast()
            : false;
    }

    public function getIsPregnantAttribute()
    {
        return $this->updated_details->is_pregnant;
    }


}
