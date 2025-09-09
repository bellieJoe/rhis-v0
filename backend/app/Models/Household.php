<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['head', 'address'];

    public function householdProfiles()
    {
        return $this->hasMany(HouseholdProfile::class);
    }

    public function getHeadAttribute()
    {
        return $this->householdProfiles()
            ->whereHas('householdProfileDetails', function ($query) {
                $query->where('member_relationship_id', 1);
            })
            ->with('householdProfileDetails') 
            ->first();
    }
    
    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

    protected static function booted()
    {
        static::created(function ($household) {
            $household->household_no = $household->id;
            $household->save();
        });
    }

    public function getAddressAttribute()
    {
        return $this->barangay->barangay_name . ', ' . $this->barangay->municipality->municipality_name . ', ' . $this->barangay->municipality->province->province_name;
    }
}
