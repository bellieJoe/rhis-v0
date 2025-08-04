<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    //
    protected $table = "barangays";

    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }
}
