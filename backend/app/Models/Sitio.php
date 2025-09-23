<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sitio extends Model
{
    //
    protected $guarded = [];
    


    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }
}
