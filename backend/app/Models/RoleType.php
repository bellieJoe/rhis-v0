<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleType extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['caps_name'];

    public function getCapsNameAttribute(){
        return  strtoupper($this->name);
    }
}
