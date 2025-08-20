<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseholdProfile extends Model
{
    //
    protected $guarded = [];
    protected $appends = ["updated_details"];

    public function household()
    {
        return $this->belongsTo(Household::class);

    }

    public function householdProfileDetails() {
        return $this->hasMany(HouseholdProfileDetail::class);
    }

    public function getUpdatedDetailsAttribute() {
        return HouseholdProfileDetail::query()->with([...HouseholdProfileDetail::GENERICS_RELATIONS])->where("household_profile_id" , $this->id)
        ->orderBy('created_at', 'desc')->first();
    }

}
