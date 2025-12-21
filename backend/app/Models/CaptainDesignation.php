<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaptainDesignation extends Model
{
    //
    protected $table = 'captain_designations';
    protected $guarded = [];

    public function office() {
        return $this->belongsTo(Office::class);
    }

    
}
