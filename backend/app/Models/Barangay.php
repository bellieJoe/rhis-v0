<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    //
    protected $table = "barangays";

    protected $guarded = [];

    protected $appends = ['full_address'];

    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }

    public function getFullAddressAttribute() {
        return $this->barangay_name . ', ' . $this->municipality->municipality_name . ', ' . $this->municipality->province->province_name;
    }
}
