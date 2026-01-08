<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnimalBiteRecord extends Model
{
    protected $guarded = [];
    protected $with = ["animalTypee"];
    
    public function household_profile() {
        return $this->belongsTo(HouseholdProfile::class);
    }

    public function animalTypee() {
        return $this->hasOne(GenericType::class, 'id', 'animal_type');
    }
}
