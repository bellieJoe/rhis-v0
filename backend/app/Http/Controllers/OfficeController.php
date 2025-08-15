<?php

namespace App\Http\Controllers;

use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OfficeController extends Controller
{
    //
    public function index(Request $request) {
        $query = Office::query();
        $query->with('municipality.province', 'province', 'parent');

        return $query->paginate(20);
    }
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

        return DB::transaction(function () use ($request) {
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
        });
    }

    public function search (Request $request) {
        $query = Office::query();
    
        $search = $request->input("search");
        $query->where("name", "like", "%$search%");

        if($request->input("office_type")) {
            $office_type = $request->input("office_type");
            $type_map = [
                "barangay" => "rhu",
                "rhu" => "pho"
            ];
            $query->where("office_type", $type_map[$office_type]);
        }
    
        return response()->json($query->limit(100)->get());
    }
}

