<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GenericType extends Model
{
    protected $guarded = [];
    protected $appends = ['label'];
    
    //
    const TYPE_MEMBERS_OF_HOUSEHOLD = 'MEMBERS_OF_HOUSEHOLD';
    const TYPE_CIVIL_STATUS= 'CIVIL_STATUS';
    const TYPE_GENDER = 'GENDER';
    const TYPE_EDUCATIONAL_ATTAINMENT = 'EDUCATIONAL_ATTAINMENT';
    const TYPE_RELIGION = 'RELIGION';
    const TYPE_CLASSIFICATION_BY_AHRG = 'CLASSIFICATION_BY_AHRG';
    const TYPE_FAMILY_PLANNING_METHOD = 'FAMILY_PLANNING_METHOD';
    const TYPE_FAMILY_PLANNING_STATUS = 'FAMILY_PLANNING_STATUS';
    const TYPE_WATER_SOURCE_TYPE = 'WATER_SOURCE_TYPE';
    const TYPE_TOILET_FACILITY_TYPE = 'TOILET_FACILITY_TYPE';
    const TYPE_PHILHEALTH_MEMBERSHIP = 'PHILHEALTH_MEMBERSHIP';
    const TYPE_PHILHEALTH_CATEGORY = 'PHILHEALTH_CATEGORY';
    const TYPE_MEDICAL_HISTORY = 'MEDICAL_HISTORY';
    const TYPE_MEDICATION = 'MEDICATION';

    const ALL_TYPES = [
        self::TYPE_CIVIL_STATUS,
        self::TYPE_MEMBERS_OF_HOUSEHOLD,
        self::TYPE_GENDER,
        self::TYPE_EDUCATIONAL_ATTAINMENT,
        self::TYPE_RELIGION,
        self::TYPE_CLASSIFICATION_BY_AHRG,
        self::TYPE_FAMILY_PLANNING_METHOD,
        self::TYPE_FAMILY_PLANNING_STATUS,
        self::TYPE_WATER_SOURCE_TYPE,
        self::TYPE_TOILET_FACILITY_TYPE,
        self::TYPE_PHILHEALTH_MEMBERSHIP,
        self::TYPE_PHILHEALTH_CATEGORY,
        self::TYPE_MEDICAL_HISTORY,
        self::TYPE_MEDICATION
    ];

    public function getLabelAttribute(){
        return ($this->code && $this->code != "" ? $this->code . " - " : "") . $this->name;
    }
}
