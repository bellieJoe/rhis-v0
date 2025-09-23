<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BhwDesignation extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['office'];
    
    public function barangay() {
        return $this->belongsTo(Sitio::class);
    }

    public function getOfficeAttribute() {
        return Office::where('barangay_id', $this->barangay_id)->first();
    }

    public function sitio() {
        return $this->belongsTo(Sitio::class);
    }
}
