<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyPlanningClient extends Model
{
    //
    protected $table = 'family_planning_clients';
    protected $guarded = [];
    
    const TYPE_CURRENT_USER = "Current User";
    const TYPE_NEW_ACCEPTOR = "New Acceptor";
    const TYPE_OTHER_ACCEPTORS = "Other Acceptors";

    public function householdProfile()
    {
        return $this->belongsTo(HouseholdProfile::class);
    }
}
