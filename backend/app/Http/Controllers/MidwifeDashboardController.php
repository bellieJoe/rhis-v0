<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MidwifeDashboardController extends Controller
{
    //
    public function getMidwifeDashboard(Request $request) 
    {
        $name = $request->has('name') ? $request->name : null;
        $barangayIds = $request->has('barangayIds') ? $request->barangayIds : null;
        $start = $request->has('start') ? $request->start : null;
        $end = $request->has('end') ? $request->end : null;

        switch ($name) {
            default:
                return $this->getMidwifeDashboardData($request);
        }

    }

    private function getMidwifeDashboardData(Request $request)
    {

    }
}
