<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
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
}
