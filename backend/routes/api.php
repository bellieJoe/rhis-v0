<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("auth")->group(function () {
    Route::get("is-auth", [AuthController::class, "isAuth"]);
    Route::get("user", [AuthController::class, "user"]);
});

Route::prefix("auth")->group(function () {
    Route::get("user", [AuthController::class, "user"]);
    Route::post("logout", [AuthController::class, "logout"]);
})->middleware("auth:sanctum");

Route::prefix("roles")->group(function (){
    Route::get("get-by-user", [RoleController::class ,"getByUser"]);
})->middleware("auth:sanctum");

Route::prefix("users")->group(function () {
    Route::get("", [UserController::class, "index"]);
});

Route::prefix("offices")->group(function () {
    Route::post("", [OfficeController::class, "store"]);
});

Route::prefix("barangays")->group(function () {
    Route::get("addresses", [BarangayController::class, "barangays"]);
});


