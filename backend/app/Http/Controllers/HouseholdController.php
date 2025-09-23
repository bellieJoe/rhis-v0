<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HouseholdController extends Controller
{
    //
    public function index (Request $request) {
        $search = $request->search;
        $user = Auth::user();
        $query = Household::query();

        if($user->roles->first()->role_type_id === 1) {
            $query->whereIn('sitio_id', $user->bhwDesignations->pluck('sitio_id'));
        }

        if($request->has('search') && $search) {
            $query->where(function($q) use ($search) {
                $q->where('household_no', 'like', "$search%")
                ->orWhere('name', 'like', "$search%");
            });
        }

        return $query->paginate(20);
    }

    public function store (Request $request) {
        $request->validate([
            'barangay' => 'required|exists:barangays,id',
            "sitio" => "required|exists:sitios,id",
            // 'household_no' => 'required|unique:households,household_no|max:12',
            "date_of_visit" => "required|date",
        ], [
            
        ], [
            'barangay' => 'Address'
        ]);

        $household = Household::create([
            'barangay_id' => $request->barangay,
            // 'household_no' => $request->household_no,
            'sitio_id' => $request->sitio,
            'household_no' => 0,
            'date_of_visit' => $request->date_of_visit
        ]);

        return response()->json([
            'message' => 'Household created successfully',
            'household' => $household
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

    public function getHousehold(string $id) {
        return Household::find($id);
    }

    // public 
}
