<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\GenericTypeController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\HouseholdProfileController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\ProvinceController;
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
    Route::get("", [OfficeController::class, "index"]);
    Route::get("search", [OfficeController::class, "search"]);
});

Route::prefix("barangays")->group(function () {
    Route::get("addresses", [BarangayController::class, "barangays"]);
    Route::get("search", [BarangayController::class, "search"]);
});

Route::prefix("provinces")->group(function () {
    Route::get("search", [ProvinceController::class, "search"]);
});

Route::prefix("municipalities")->group(function () {
    Route::get("search", [MunicipalityController::class, "search"]);
});

Route::prefix("generic-types")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("", [GenericTypeController::class, "index"]);
    });
});

Route::prefix("households")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("", [HouseholdController::class, "store"]);
        Route::get("", [HouseholdController::class, "index"]);
        Route::delete("{id}", [HouseholdController::class, "destroy"]);
    });
});

Route::prefix("household-profiles")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("", [HouseholdProfileController::class, "index"]);
        Route::post("", [HouseholdProfileController::class, "store"]);
    });
});


