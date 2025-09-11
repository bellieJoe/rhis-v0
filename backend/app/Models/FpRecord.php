<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FpRecord extends Model
{
    //
    protected $guarded = [];
     protected $with = ['fpMethod'];

    public function household_profile() {
        return $this->belongsTo(HouseholdProfile::class);
    }

    public function fpMethod() {
        return $this->belongsTo(GenericType::class, 'fp_method_id', 'id');
    }
}
