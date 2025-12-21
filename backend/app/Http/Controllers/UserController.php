<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\BhwDesignation;
use App\Models\CaptainDesignation;
use App\Models\PersonalInformation;
use App\Models\Role;
use App\Models\RoleType;
use App\Models\User;
use App\Notifications\UserCreatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

class UserController extends Controller
{
    //
    public function index() {
        $query = User::query()
        ->with('roles', 'roles.roleType');

        return response(
            $query->paginate(20)
        );
    }

    public function store(Request $request) {
        $request->validate([
            'firstname' => 'required',
            'middlename' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'role_type_id' => 'required'
        ], [], [
            'role_type_id' => 'Role'
        ]);

        return DB::transaction(function () use ($request) {
            $password = str()->random(10);
    
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($password),
            ]);

            Notification::send($user, new UserCreatedNotification($password));
    
            PersonalInformation::create([
                'user_id' => $user->id,
                'first_name' => $request->firstname,
                'middle_name' => $request->middlename,
                'last_name' => $request->lastname,
            ]);
            
            Role::create([
                'user_id' => $user->id,
                'role_type_id' => $request->role_type_id
            ]);
        });
    }

    public function getBhwsByCaptain(Request $request, $user_id)
    {
        $designation = CaptainDesignation::where("user_id", $user_id)->first();
        if(!$designation) {
            return response()->json(["message" => "User has no designation"], 419);
        }
        return User::whereHas("bhwDesignations", function ($query) use ($designation) {
            $query->where('barangay_id', $designation->office->barangay_id);
        })
        ->get();
    }

    public function addBhw(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'firstname' => 'required',
            'middlename' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'sitios' => 'required|array',
            'sitios.*' => 'required|exists:sitios,id',
        ]);
        return DB::transaction(function () use ($request) {
            $designation = CaptainDesignation::where('user_id', $request->user_id)->first();
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make(str()->random(10)),
            ]);

            PersonalInformation::create([
                'user_id' => $user->id,
                'first_name' => $request->firstname,
                'middle_name' => $request->middlename,
                'last_name' => $request->lastname,
            ]);
            
            $role = Role::create([
                'user_id' => $user->id,
                'role_type_id' => 1
            ]);

            BhwDesignation::insert(array_map(function ($sitio) use ($request, $role, $designation) {
                return [
                    'sitio_id' => $sitio,
                    'barangay_id' => $designation->office->barangay_id,
                    'user_id' => $request->user_id
                ];
            }, $request->sitios));
        });
    }
}
