<?php

namespace App\Http\Controllers;

use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OfficeController extends Controller
{
    //
    public function store(Request $request) {
        $request->validate([
            'office_name' => 'required',
            'office_type' => 'required',
            'barangay' => 'nullable|required_if:office_type,barangay',
            'municipality' => 'nullable|required_if:office_type,rhu',
            'province' => 'nullable|required_if:office_type,pho',
            'parent' => [
                'nullable', 
                Rule::requiredIf(function () {
                    return in_array(request('office_type'), ['barangay', 'rhu']);
                })
            ],
            'address' => 'required'
        ]);

        Office::create([
            'name' => $request->office_name,
            'office_type' => $request->office_type,
            'barangay_id' => $request->office_type == 'barangay' ? $request->barangay : null,
            'municipality_id' => $request->office_type == 'rhu' ? $request->municipality : null,
            'province_id' => $request->office_type == 'pho' ? $request->province : null,
            'parent_id' => in_array($request->office_type, ['barangay', 'rhu']) ? $request->parent : null,
            'address_barangay_id' => $request->address
        ]);

        return response()->json([
            'message' => 'Office created successfully'
        ], 201);
    }
}
