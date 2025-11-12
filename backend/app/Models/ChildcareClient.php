<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildcareClient extends Model
{
    //
    protected $guarded = [];

    public function householdProfile()
    {
        return $this->belongsTo(HouseholdProfile::class);
    }
}
