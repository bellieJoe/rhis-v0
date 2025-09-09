<?php

namespace Database\Seeders;

use App\Models\GenericType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenericTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        GenericType::insert([
            // Members of Household
            [
                'id' => 1,
                'type' => GenericType::TYPE_MEMBERS_OF_HOUSEHOLD,
                'code' => '1',
                'name' => 'Head',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'type' => GenericType::TYPE_MEMBERS_OF_HOUSEHOLD,
                'code' => '2',
                'name' => 'Spouse',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'type' => GenericType::TYPE_MEMBERS_OF_HOUSEHOLD,
                'code' => '3',
                'name' => 'Son',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'type' => GenericType::TYPE_MEMBERS_OF_HOUSEHOLD,
                'code' => '4',
                'name' => 'Daughter',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'type' => GenericType::TYPE_MEMBERS_OF_HOUSEHOLD,
                'code' => '5',
                'name' => 'Others, specify relation',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Educational Attainment
            [
                'id' => 6,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'N',
                'name' => 'None',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 7,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'PS',
                'name' => 'Pre-school',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 8,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'ES',
                'name' => 'Elem Student',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 9,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'EU',
                'name' => 'Elem Undergrad',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 10,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'EG',
                'name' => 'Elem Graduate',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 11,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'HS',
                'name' => 'HS Student',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 12,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'HU',
                'name' => 'HS Undergrad',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 13,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'HG',
                'name' => 'HS Graduate',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 14,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'SH',
                'name' => 'Senior H/S',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 15,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'ALS',
                'name' => 'Adv Learning System',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 16,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'V',
                'name' => 'Vocational Course',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 17,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'CS',
                'name' => 'College Student',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 18,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'CU',
                'name' => 'College Undergrad',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 19,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'CG',
                'name' => 'College Graduate',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 20,
                'type' => GenericType::TYPE_EDUCATIONAL_ATTAINMENT,
                'code' => 'PG',
                'name' => 'Postgrad/Masteral/Doctorate',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Religion
            [
                'id' => 21,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Roman Catholic',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 22,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Christian',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 23,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'INC',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 24,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Catholic',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 25,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Islam',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 26,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Baptist',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 27,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Born Again',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 28,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Buddhism',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 29,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Church of God',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 30,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Jehovahs Witness',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 31,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Protestant',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 32,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Seventh Day Adventist',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 33,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'LDS-Mormons',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 34,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Evangelical',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 35,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Pentecostal',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 36,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Unknown',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 37,
                'type' => GenericType::TYPE_RELIGION,
                'code' => '',
                'name' => 'Others (pls. Specify)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Classification by AHRG
            [
                'id' => 38,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'N',
                'name' => 'Newborn (0-28 days)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 39,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'I',
                'name' => 'Infant (0-1 y/o)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 40,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'PSAC',
                'name' => '1-4 y/o',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 41,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'SAC',
                'name' => 'School Age (5-9 y/o)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 42,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'Ad',
                'name' => 'Adolecent (10-19 y/o)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 43,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'A',
                'name' => 'Adult (20-59 y/o)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 44,
                'type' => GenericType::TYPE_CLASSIFICATION_BY_AHRG,
                'code' => 'SC',
                'name' => 'Senior Citizen',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Family Planning Method
            [
                'id' => 45,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'COC',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 46,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'POP',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 47,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'Injectables',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 48,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'IUD',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 49,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'Condom',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 50,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'LAM',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 51,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'BTL',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 52,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'Implant',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 53,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'SDM',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 54,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'DPT',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 55,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'Withdrawal',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 56,
                'type' => GenericType::TYPE_FAMILY_PLANNING_METHOD,
                'code' => '',
                'name' => 'Others (pls. specify)',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // 
            [
                'id' => 57,
                'type' => GenericType::TYPE_FAMILY_PLANNING_STATUS,
                'code' => 'NA',
                'name' => 'New Acceptor',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 58,
                'type' => GenericType::TYPE_FAMILY_PLANNING_STATUS,
                'code' => 'CU',
                'name' => 'Current User',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 59,
                'type' => GenericType::TYPE_FAMILY_PLANNING_STATUS,
                'code' => 'CM',
                'name' => 'Changing Method',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 60,
                'type' => GenericType::TYPE_FAMILY_PLANNING_STATUS,
                'code' => 'CC',
                'name' => 'Changing Clinic',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 61,
                'type' => GenericType::TYPE_FAMILY_PLANNING_STATUS,
                'code' => 'DO',
                'name' => 'Drop Out',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 62,
                'type' => GenericType::TYPE_FAMILY_PLANNING_STATUS,
                'code' => 'R',
                'name' => 'Restarter',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Water Source Type
            [
                'id' => 63,
                'type' => GenericType::TYPE_WATER_SOURCE_TYPE,
                'code' => 'Lv I',
                'name' => 'Point Source',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 64,
                'type' => GenericType::TYPE_WATER_SOURCE_TYPE,
                'code' => 'Lv II',
                'name' => 'Communal faucet system or stand posts',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 65,
                'type' => GenericType::TYPE_WATER_SOURCE_TYPE,
                'code' => 'Lv III',
                'name' => 'Waterworks system or individual house connection',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 66,
                'type' => GenericType::TYPE_WATER_SOURCE_TYPE,
                'code' => 'O',
                'name' => 'For doubtful sources, open dug well etc.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Toilet Facility Type
            [
                'id' => 67,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'P',
                'name' => 'Pour/flush toilet connected to septic tank.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 68,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'PF',
                'name' => 'Pour/flush toilet connected to septic tank and sewerage system',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 69,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'VIP',
                'name' => 'Ventilated improved pit latrine (VIP) or composting toilet',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 70,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'WS',
                'name' => 'Water-sealed connected to open drain',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 71,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'OH',
                'name' => 'Overhung Latrine',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 72,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'OP',
                'name' => 'Open-pit Latrine',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 73,
                'type' => GenericType::TYPE_TOILET_FACILITY_TYPE,
                'code' => 'WO',
                'name' => 'Without toilet',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // CIVIL STATUS
            [
                'id' => 74,
                'type' => GenericType::TYPE_CIVIL_STATUS,
                'code' => 'M',
                'name' => 'Married',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 75,
                'type' => GenericType::TYPE_CIVIL_STATUS,
                'code' => 'S',
                'name' => 'Single',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 76,
                'type' => GenericType::TYPE_CIVIL_STATUS,
                'code' => 'W',
                'name' => 'Widow/er',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 77,
                'type' => GenericType::TYPE_CIVIL_STATUS,
                'code' => 'SP',
                'name' => 'Separated',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 78,
                'type' => GenericType::TYPE_CIVIL_STATUS,
                'code' => 'C',
                'name' => 'Cohabitation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // GENDER
            [
                'id' => 79,
                'type' => GenericType::TYPE_GENDER,
                'code' => 'M',
                'name' => 'Male',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 80,
                'type' => GenericType::TYPE_GENDER,
                'code' => 'F',
                'name' => 'Female',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // PHILHEALT MEMBERSHIP TYPE
            [
                'id' => 81,
                'type' => GenericType::TYPE_PHILHEALTH_MEMBERSHIP,
                'code' => 'M',
                'name' => 'Member',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 82,
                'type' => GenericType::TYPE_PHILHEALTH_MEMBERSHIP,
                'code' => 'D',
                'name' => 'Dependent',
                'created_at' => now(),  
                'updated_at' => now()
            ],
            // PHILHEALTH CATEGORY
            [
                'id' => 83,
                'type' => GenericType::TYPE_PHILHEALTH_CATEGORY,
                'code' => 'DC',
                'name' => 'Direct Contributors',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 84,
                'type' => GenericType::TYPE_PHILHEALTH_CATEGORY,
                'code' => 'IC',
                'name' => 'Indirect Contributors',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 85,
                'type' => GenericType::TYPE_PHILHEALTH_CATEGORY,
                'code' => 'U',
                'name' => 'Unknown',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // MEDICAL HISTORY
            [
                'id' => 86,
                'type' => GenericType::TYPE_MEDICAL_HISTORY,
                'code' => 'HPN',
                'name' => 'Hypertension',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 87,
                'type' => GenericType::TYPE_MEDICAL_HISTORY,
                'code' => 'DM',
                'name' => 'Diabetes',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 89,
                'type' => GenericType::TYPE_MEDICAL_HISTORY,
                'code' => 'N/A',
                'name' => 'Not Applicable',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
