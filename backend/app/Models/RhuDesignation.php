<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RhuDesignation extends Model
{
    //
    protected $table = "rhu_designation";
    protected $guarded = [];

    public function office() {
        return $this->belongsTo(Office::class);
    }
}
