<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaternalSupplement extends Model
{
    //
    protected $guarded = [];

    public function maternalClient()
    {
        return $this->belongsTo(MaternalClient::class);
    }
}
