<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\Sitio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SitioController extends Controller
{
    //
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'barangay' => 'required|exists:barangays,id',
        ], [], [
            'name' => 'Name',
            'barangay' => 'Barangay'
        ]);

        return DB::transaction(function () use ($request) {
            Sitio::create([
                'sitio_name' => $request->name,
                'barangay_id' => $request->barangay
            ]);
        });
    }

    public function index (Request $request) {
        $isPaginated = $request->has('paginate') ? filter_var($request->paginate, FILTER_VALIDATE_BOOLEAN) : true;
        $barangay = $request->has('barangay') ? $request->barangay : null;
        $office = $request->has('office') ? $request->office : null;
        $limit = $request->has('limit') ? $request->limit : 50;

        $query = Sitio::query();
        $query->with('barangay');
        if($barangay) {
            $query->where('barangay_id', $request->barangay);
        }
        
        if($office) {
            $office = Office::findOrFail($office);
            $query->where('barangay_id', $office->address_barangay_id);
        }

        return $isPaginated ? $query->paginate($limit) : $query->get();
    }

    public function destroy(string $id) {
        return DB::transaction(function () use ($id) {
            Sitio::destroy($id);
        });
    }

    public function update(Request $request, string $id) {
        $request->validate([
            'name' => 'required|string',
            'barangay' => 'required|exists:barangays,id',
        ], [], [
            'name' => 'Name',
            'barangay' => 'Barangay'
        ]);

        return DB::transaction(function () use ($request, $id) {
            $sitio = Sitio::findOrFail($id);
            $sitio->update([
                'sitio_name' => $request->name,
                'barangay_id' => $request->barangay
            ]);
        });
    }
}
