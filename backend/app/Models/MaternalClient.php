<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaternalClient extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['fullname'];

    public function householdProfile()
    {
        return $this->belongsTo(HouseholdProfile::class);
    }
    
    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->middlename . ' ' . $this->lastname;
    }

    public function maternalSupplements()
    {
        return $this->hasMany(MaternalSupplement::class);
    }
}
