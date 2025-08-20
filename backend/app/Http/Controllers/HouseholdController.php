<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use Illuminate\Http\Request;

class HouseholdController extends Controller
{
    //
    public function index (Request $request) {
        $query = Household::query();

        return $query->paginate(20);
    }


    public function store (Request $request) {
        $request->validate([
            // 'sitio' => 'required|exists:sitios,id',
            'household_no' => 'required|unique:households,household_no|max:12',
            'household_name' => 'required|max:255'
        ], [
            
        ], [
            'sitio' => 'Address'
        ]);

        Household::create([
            // 'sitio_id' => $request->sitio,
            'sitio_id' => 1,
            'household_no' => $request->household_no,
            'name' => $request->household_name
        ]);

        return response()->json([
            'message' => 'Household created successfully'
        ]);
    }

    public function destroy(string $id) {
        $household = Household::find($id);
        if(!$household) {
            return response()->json([
                'message' => 'Household not found'
            ], 404);
        }
        if($household->householdProfiles()->count() > 0) {
            return response()->json([
                'message' => 'Household already has profiles'
            ], 400);
        }
        $household->delete();
        return response()->json([
            'message' => 'Household deleted successfully'
        ]);
    }
}
