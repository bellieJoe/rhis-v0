<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use Illuminate\Http\Request;

class BarangayController extends Controller
{
    //
    public function barangays(Request $request) {
        $query = Barangay::query()
            ->with('municipality.province', 'municipality');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('barangay_name', 'like', "$search%")
                ->orWhereHas('municipality', function ($q) use ($search) {
                    $q->where('municipality_name', 'like', "$search%")
                        ->orWhereHas('province', function ($q) use ($search) {
                            $q->where('province_name', 'like', "$search%");
                        });
                });
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
