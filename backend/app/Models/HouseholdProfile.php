<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseholdProfile extends Model
{
    //
    protected $guarded = [];

    public function household()
    {
        return $this->belongsTo(Household::class);

    }

    public function householdProfileDetails() {
        return $this->hasMany(HouseholdProfileDetail::class);
    }

}
