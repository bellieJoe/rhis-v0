<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BarangayController extends Controller
{
    public function index(Request $request) {
        $query = Barangay::query();

        if($request->has('municipality')) {
            $query->where('municipality_id', $request->municipality);    
        }

        return $query->get();
    }
    public function barangays(Request $request) {
        $query = Barangay::query()
            ->with('municipality.province', 'municipality');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                // Search directly in barangay
                $q->where('barangay_name', 'like', "%$search%")
                
                // Search inside municipality
                ->orWhereHas('municipality', function ($q) use ($search) {
                    $q->where('municipality_name', 'like', "%$search%")
                    ->orWhereHas('province', function ($q) use ($search) {
                        $q->where('province_name', 'like', "%$search%");
                    });
                })
                // Search across concatenated columns
                ->orWhereRaw("CONCAT(barangay_name, ' ', 
                                    (select municipality_name from municipalities where municipalities.id = barangays.municipality_id), 
                                    ' ', 
                                    (select province_name from provinces where provinces.id = (select province_id from municipalities where municipalities.id = barangays.municipality_id))
                                ) like ?", ["%$search%"]);
            });
        }
        return $query->limit(100)->get();
    }
    public function search(Request $request) {
        $query = Barangay::query()
            ->with('municipality.province', 'municipality');
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('barangay_name', 'like', "%$search%")
                ->orWhereHas('municipality', function ($q) use ($search) {
                    $q->where('municipality_name', 'like', "%$search%")
                        ->orWhereHas('province', function ($q) use ($search) {
                            $q->where('province_name', 'like', "%$search%");
                        });
                });
            });
        }
        if($request->has("parent" || $request->input("parent"))) {
            $query->where("municipality_id", $request->input("parent"));
        }
        return $query->limit(100)->get();
    }
}
