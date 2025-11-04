<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MidwifeDesignation extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['office'];
    
    public function barangay () {
        return $this->belongsTo(Barangay::class);
    }

    public function getOfficeAttribute() {
        return Office::where('barangay_id', $this->barangay_id)->first();
    }
}
