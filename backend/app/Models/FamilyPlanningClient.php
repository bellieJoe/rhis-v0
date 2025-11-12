<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyPlanningClient extends Model
{
    //
    protected $table = 'family_planning_clients';
    protected $guarded = [];

    public function householdProfile()
    {
        return $this->belongsTo(HouseholdProfile::class);
    }
}
