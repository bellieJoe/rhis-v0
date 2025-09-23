<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sitio extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['full_address'];


    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

    public function getFullAddressAttribute()
    {
        return $this->sitio_name . ', ' . $this->barangay->barangay_name . ', ' . $this->barangay->municipality->municipality_name . ', ' . $this->barangay->municipality->province->province_name;
    }
}
