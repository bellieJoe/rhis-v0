<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Household;
use App\Models\HouseholdProfile;
use App\Models\HouseholdProfileDetail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
    public function getMembers(Request $request, $household_id)
    {
        $household = Household::find($household_id);

        if (!$household) {
            return response()->json([
                'message' => 'Household not found'
            ], 404);
        }

        // Load members (load relation if it exists)
        $members = HouseholdProfile::where('household_id', $household_id)
            ->get();

        // Identify family heads
        $heads = $members->filter(function ($member) {
            return optional($member->updated_details)->is_family_head == 1 || $member->updated_details->member_relationship_id == 1;
        });
        Log::info($heads);
        $underlings = $members->filter(function ($member) {
            return optional($member->updated_details)->is_family_head != 1 && $member->updated_details->member_relationship_id != 1;
        });

        $families = collect($heads)->sortBy("member_relationship_id")->map(function ($head) use ($underlings) {
            return (object)[
                "head" => $head,
                "members" => $head->updated_details->member_relationship_id == 1 ? 
                $underlings->filter(function($member) use ($head) { 
                    return $member->updated_details->family_head_id == $head->id || $member->updated_details->family_head_id == 0; 
                })->sortBy("member_relationship_id")->values()->toArray() 
                : $underlings->filter(function ($member) use ($head) {
                    return optional($member->updated_details)->family_head_id == $head->id;
                })->sortBy("member_relationship_id")->values()->toArray()
            ];
        });
        
        return $families->values()->toArray();

        // Group members by family_head_id
        // $groupedMembers = $members->groupBy(function ($member) {
        //     return optional($member->updated_details)->family_head_id;
        // });

        // $sorted = collect();
        // $usedMemberIds = collect();

        // foreach ($heads as $head) {
        //     // Add head
        //     $sorted->push($head);
        //     $usedMemberIds->push($head->id);

        //     // Add members under this head
        //     if ($groupedMembers->has($head->id)) {
        //         foreach ($groupedMembers[$head->id] as $member) {
        //             // Avoid duplicating the head itself
        //             if ($member->id !== $head->id) {
        //                 $sorted->push($member);
        //                 $usedMemberIds->push($member->id);
        //             }
        //         }
        //     }
        // }

        // // 🔹 Add remaining / unassigned members
        // $remainingMembers = $members->reject(function ($member) use ($usedMemberIds) {
        //     return $usedMemberIds->contains($member->id);
        // });

        // $sorted = $sorted->merge($remainingMembers);

        // return $sorted->values()->toArray();
    }

    public function countPregnants(Request $request, $household_id) {
        $household = Household::find($household_id);
        if(!$household) {
            return response()->json([
                'message' => 'Household not found'
            ], 404);
        }
        return HouseholdProfile::where('household_id', $household_id)
        ->whereHas('householdProfileDetails', function ($q) {
            $q->where('is_pregnant', 1)
            ->whereIn('id', function ($sub) {
                $sub->selectRaw('MAX(id)')
                    ->from('household_profile_details')
                    ->groupBy('household_profile_id');
            });
        })
        ->count();
    }

    public function countSeniors(Request $request, $household_id) {
        $household = Household::find($household_id);
        if(!$household) {
            return response()->json([
                'message' => 'Household not found'
            ], 404);
        }
        return HouseholdProfile::where('household_id', $household_id)
        ->where('birthdate', '<', Carbon::now()->subYears(60)->toDateString())
        ->count();
    }

    public function countByBarangay(Request $request, $barangay_id) {
        return Household::where('barangay_id', $barangay_id)->count();
    }
}
