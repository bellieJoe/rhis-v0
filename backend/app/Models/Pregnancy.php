<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregnancy extends Model
{
    //

    protected $guarded = [];

    public function household_profile() {
        return $this->belongsTo(HouseholdProfile::class);
    }
}
