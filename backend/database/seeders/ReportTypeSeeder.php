<?php

namespace Database\Seeders;

use App\Models\ReportType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ReportType::insert([
            [
                "id" => 1,
                "name" => "bhw-monthly-report",
            ],
            [
                "id" => 2,
                "name" => "bhw-summary-report",
            ],
            [
                "id" => 3,
                "name" => "midwife-env-st"
            ], 
            [
                "id" => 4,
                "name" => "midwife-fp-st"
            ],
            [
                "id" => 5,
                "name" => "midwife-fp-st"
            ],
            [
                "id" => 6,
                "name" => "midwife-cc-st"
            ],
            [
                "id" => 7,
                "name" => "midwife-mc-st"
            ],
            [
                "id" => 8,
                "name" => "midwife-ncd-st"
            ],
            [
                "id" => 9,
                "name" => "rhu-m1"
            ]
        ]);
    }
}
