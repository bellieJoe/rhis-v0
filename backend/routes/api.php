<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\BirthController;
use App\Http\Controllers\GenericTypeController;
use App\Http\Controllers\HealthcareServiceController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\HouseholdProfileController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\PregnancyController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Pregnancy;
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
    Route::get("", [BarangayController::class, "index"]);
    Route::get("addresses", [BarangayController::class, "barangays"]);
    Route::get("search", [BarangayController::class, "search"]);
});

Route::prefix("provinces")->group(function () {
    Route::get("search", [ProvinceController::class, "search"]);
});

Route::prefix("municipalities")->group(function () {
    Route::get("", [MunicipalityController::class, "index"]);
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
        Route::get("{id}", [HouseholdController::class, "getHousehold"]);
        Route::delete("{id}", [HouseholdController::class, "destroy"]);
    });
});

Route::prefix("household-profiles")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("", [HouseholdProfileController::class, "index"]);
        Route::get("{id}", [HouseholdProfileController::class, "show"]);
        Route::post("", [HouseholdProfileController::class, "store"]);
        Route::put("update-addtnl-info", [HouseholdProfileController::class, "updateAdditionalInfo"]);
        Route::put("update-main-info", [HouseholdProfileController::class, "updateMainInfo"]);
        Route::delete("{id}", [HouseholdProfileController::class, "destroy"]);
    });
});

Route::prefix("healthcare-services")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("pregnants", [HealthcareServiceController::class, "storePregnant"]);
        Route::post("gave-births", [HealthcareServiceController::class, "storeBirthRecord"]);
        Route::post("new-borns", [HealthcareServiceController::class, "storeNewBornRecord"]);
        Route::post("vaccinateds", [HealthcareServiceController::class, "storeVaccinatedRecord"]);
        Route::post("family-plannings", [HealthcareServiceController::class, "storeFpRecord"]);
        Route::post("deaths", [HealthcareServiceController::class, "storeDeathRecord"]);
        Route::post("sicks", [HealthcareServiceController::class, "storeSickRecord"]);
        Route::post("has-high-bloods", [HealthcareServiceController::class, "storeHighbloodRecord"]);
        Route::post("has-diabetes", [HealthcareServiceController::class, "storeDiabetesRecord"]);
        Route::post("unirinalysis", [HealthcareServiceController::class, "storeUrinalysisResult"]);
        Route::post("has-cancers", [HealthcareServiceController::class, "storeCancerRecord"]);
        Route::post("has-epilepsies", [HealthcareServiceController::class, "storeEpilepsyRecord"]);
        Route::post("animal-bites", [HealthcareServiceController::class, "storeAnimalBiteRecord"]);
        Route::get("monthly-records", [HealthcareServiceController::class, "getMonthlyRecords"]);
    });
});

Route::prefix("reports")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("summary-report", [ReportController::class, "getSummaryReport"]);
    });
});




