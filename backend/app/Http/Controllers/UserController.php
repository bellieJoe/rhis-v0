<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\RoleType;
use App\Models\User;
use Illuminate\Http\Request;

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
}
