<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Birth extends Model
{
    protected $guarded = [];
    protected $appends = ['placeofbirth'];

    public function barangay() {
        return $this->belongsTo(Barangay::class, 'place_of_birth', 'id');
    }

    public function household_profile() {
        return $this->belongsTo(HouseholdProfile::class);
    }

    public function getPlaceofbirthAttribute()
    {
        $placeOfBirthId = $this->attributes['place_of_birth'] ?? null;

        if (!$placeOfBirthId) {
            return null;
        }
        $barangay = Barangay::find($placeOfBirthId);

        if (!$barangay) {
            return null;
        }

        return $barangay->barangay_name
            . ', ' . $barangay->municipality->municipality_name
            . ', ' . $barangay->municipality->province->province_name;
    }
}
