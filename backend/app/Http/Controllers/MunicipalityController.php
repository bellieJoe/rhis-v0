<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Municipality;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class MunicipalityController extends Controller
{
    //
    public function search(Request $request) {
        $query = Municipality::query()
            ->with('province');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('municipality_name', 'like', "%$search%")
                ->orWhereHas('province', function ($q) use ($search) {
                    $q->where('province_name', 'like', "%$search%");
                });
            });
        }

        if($request->has("province" || $request->input("province"))) {
            $query->where("province_id", $request->input("province"));
        }

        return $query->limit(100)->get();
    }
}
