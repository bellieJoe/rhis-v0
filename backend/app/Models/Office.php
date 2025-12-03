<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['address', 'parent_office_name'];

    // Relationships
    public function addressLocation () {
        return $this->belongsTo(Barangay::class, 'address_barangay_id', 'id');
    }

    public function barangay() {
        return $this->belongsTo(Barangay::class, 'barangay_id', 'id');
    }

    public function municipality () {
        return $this->belongsTo(Municipality::class);
    }

    public function province () {
        return $this->belongsTo(Province::class);
    }

    public function parent () {
        return $this->belongsTo(Office::class, 'parent_id', 'id');
    }

    // Accessors
    public function getAddressAttribute()
    {
        $location = $this->addressLocation;
        $municipality = $location->municipality;
        $province = $municipality->province;
        return $location->barangay_name . ', ' . $municipality->municipality_name . ', ' . $province->province_name;
    }
    public function getParentOfficeNameAttribute()
    {
        return $this->parent ? $this->parent->name : null;
    }

    public function offices()
    {
        return $this->hasMany(Office::class, 'parent_id', 'id');
    }
}
