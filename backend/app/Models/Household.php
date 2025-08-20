<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    //
    protected $guarded = [];

    public function householdProfiles()
    {
        return $this->hasMany(HouseholdProfile::class);
    }
}
