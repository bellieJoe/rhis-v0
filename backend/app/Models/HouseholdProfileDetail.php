<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseholdProfileDetail extends Model
{
    //
    protected $guarded = [];
    protected $appends = ['full_name'];

    const GENERICS_RELATIONS = [
        'memberRelationship',
        'gender',
        'civilStatus',
        'educationalAttainment',
        'religion',
        'philhealthMembershipType',
        'philhealthCategory',
        'medicalHistory',
        'classificationByAgeHrg',
        'familyPlanningMethod',
        'familyPlanningStatus',
        'waterSource',
        'toiletFacility',
    ];

    public function householdProfile()
    {
        return $this->belongsTo(HouseholdProfile::class);
    }

    public function memberRelationship() {
        return $this->belongsTo(GenericType::class, 'member_relationship_id', 'id');
    }

    public function gender() {
        return $this->belongsTo(GenericType::class, 'gender_id', 'id');
    }

    public function civilStatus() {
        return $this->belongsTo(GenericType::class, 'civil_status_id', 'id');
    }

    public function educationalAttainment() {
        return $this->belongsTo(GenericType::class, 'educational_attainment_id', 'id');
    }

    public function religion() {
        return $this->belongsTo(GenericType::class, 'religion_id', 'id');
    }

    public function philhealthMembershipType() {
        return $this->belongsTo(GenericType::class, 'philheath_membership_type_id', 'id');
    }

    public function philhealthCategory() {
        return $this->belongsTo(GenericType::class, 'philhealth_category_id', 'id');
    }

    public function medicalHistory() {
        return $this->belongsTo(GenericType::class, 'medical_history_id', 'id');
    }

    public function classificationByAgeHrg() {
        return $this->belongsTo(GenericType::class, 'classification_by_age_hrg_id', 'id');
    }

    public function familyPlanningMethod() {
        return $this->belongsTo(GenericType::class, 'family_planning_method_id', 'id');
    }

    public function familyPlanningStatus() {
        return $this->belongsTo(GenericType::class, 'family_planning_status_id', 'id');
    }

    public function waterSource() {
        return $this->belongsTo(GenericType::class, 'water_source_type_id', 'id');
    }

    public function toiletFacility() {
        return $this->belongsTo(GenericType::class, 'toilet_facility_type_id', 'id');
    }

    // attributes
    public function getFullNameAttribute() {
        return $this->firstname . " " . $this->lastname;
    }



}
