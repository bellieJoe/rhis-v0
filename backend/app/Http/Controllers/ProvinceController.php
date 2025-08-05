<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    //
    public function search(Request $request) {
        $query = Province::query();

        if ($request->has('search')) {
            $search = $request->search;

            $query->where("province_name", "like", "%$search%");
        }

        return $query->limit(100)->get();
    }

}
