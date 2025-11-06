<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaternalClient extends Model
{
    //
    protected $fillable = [
        'id',
        'household_profile_id',
        'family_serial_no',
        'date_of_registration',
        'firstname',
        'middlename',
        'lastname',
        'address_barangay_id',
        'lmp',
        'gravida',
        'parity',
        'edc',
        'has_nearby_facility',
        'is_hypertensive',
        'first_tri_checkup_date',
        'second_tri_checkup_date',
        'third_tri_checkup_date_a',
        'third_tri_checkup_date_b',
        'tt1_date',
        'tt2_date',
        'tt3_date',
        'tt4_date',
        'tt5_date',
        'iodine_capsule_date_given',
        'calcium_carbonate_date_completed',
        'iron_sulfate_date_completed',
        'first_tri_bmi',
        'deworming_tablet_date_given',
        'gestational_diabetes_screening_date',
        'is_gestational_diabetes_positive',
        'cbc_date',
        'has_anemia',
        'given_iron',
        'remarks',
        'encoded_by',
        'created_at',
        'updated_at',
    ];
    protected $appends = ['fullname'];

    public function householdProfile()
    {
        return $this->belongsTo(HouseholdProfile::class);
    }
    
    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->middlename . ' ' . $this->lastname;
    }

    public function maternalSupplements()
    {
        return $this->hasMany(MaternalSupplement::class);
    }

    public function maternalInfectiousDiseases()
    {
        return $this->hasMany(MaternalInfectiousDisease::class);
    }
}
