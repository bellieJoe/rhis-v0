<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['head'];

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
}
