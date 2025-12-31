<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sitio extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['full_address', 'assigned_bhw_count', 'recommended_bhw_count', 'label_with_bhw_recommendation_count'];


    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

    public function getFullAddressAttribute()
    {
        return $this->sitio_name . ', ' . $this->barangay->barangay_name . ', ' . $this->barangay->municipality->municipality_name . ', ' . $this->barangay->municipality->province->province_name;
    }

    public function getAssignedBhwCountAttribute()
    {
        return BhwDesignation::where('sitio_id', $this->id)->count();
    }

    public function getRecommendedBhwCountAttribute()
    {
        return ceil(
            Household::where('sitio_id', $this->id)->count() / 25
        );
    }

    public function getLabelWithBhwRecommendationCountAttribute(){
        return $this->sitio_name . ' (' . $this->assigned_bhw_count . ' / ' . $this->recommended_bhw_count . ' BHWs assigned)';
    }
}
