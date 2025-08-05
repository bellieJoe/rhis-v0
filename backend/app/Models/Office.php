<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['address'];

    public function addressLocation () {
        return $this->belongsTo(Barangay::class, 'address_barangay_id', 'id');
    }

    public function municipality () {
        return $this->belongsTo(Municipality::class);
    }

    public function province () {
        return $this->belongsTo(Province::class);
    }

    public function getAddressAttribute()
    {
        $location = $this->addressLocation;
        $municipality = $location->municipality;
        $province = $municipality->province;
        return $location->barangay_name . ', ' . $municipality->municipality_name . ', ' . $province->province_name;
    }
}
