<?php

namespace Database\Seeders;

use App\Models\Municipality;
use App\Models\Office;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::transaction(function () {
            $pho = Office::create([
                "name" => "Marinduque Provincial Health Office",
                "parent_id" => null,
                "address_barangay_id" => 12708, // Bangbangalon
                "office_type" => "pho",
                "municipality_id" => null,
                "province_id" => 23,
                "barangay_id" => null,
                "created_at" => now(),
                "updated_at" => now(),
            ]);

            $municipalities = Municipality::where('province_id', 23)
                ->with('barangays')
                ->get();

            // Create RHUs and store them keyed by municipality_id
            $rhus = collect();
            foreach ($municipalities as $municipality) {
                $rhu = Office::create([
                    "name" => $municipality->municipality_name . " Rural Health Unit",
                    "parent_id" => $pho->id,
                    "address_barangay_id" => $municipality->barangays->first()->id,
                    "office_type" => "rhu",
                    "municipality_id" => $municipality->id,
                    "province_id" => null,
                    "barangay_id" => null,
                    "created_at" => now(),
                    "updated_at" => now(),
                ]);
                $rhus->put($municipality->id, $rhu);
            }

            // Create BHS for each barangay
            foreach ($municipalities as $municipality) {
                foreach ($municipality->barangays as $barangay) {
                    Office::create([
                        "name" => $barangay->barangay_name . " Barangay Health Station",
                        "parent_id" => $rhus[$barangay->municipality_id]->id,
                        "address_barangay_id" => $barangay->id,
                        "office_type" => "barangay",
                        "municipality_id" => $barangay->municipality_id, // fixed
                        "province_id" => null,
                        "barangay_id" => $barangay->id,
                        "created_at" => now(),
                        "updated_at" => now(),
                    ]);
                }
            }
        });

    }
}
