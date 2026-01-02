<?php

namespace Database\Seeders;

use App\Models\RoleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        RoleType::insert([
            [
                'id' => 1,
                'name' => "bwh",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'name' => "midwife",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'name' => "rhu nurse",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'name' => "provincial health coordinator",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'name' => "admin",
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'name' => "barangay captain",
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
