<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\BhwDesignationController;
use App\Http\Controllers\BirthController;
use App\Http\Controllers\CaptainDesignationController;
use App\Http\Controllers\ChildcareClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FamilyPlanningClientController;
use App\Http\Controllers\GenericTypeController;
use App\Http\Controllers\HealthcareServiceController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\HouseholdProfileController;
use App\Http\Controllers\MaternalClientController;
use App\Http\Controllers\MidwifeDashboardController;
use App\Http\Controllers\MidwifeDesignationController;
use App\Http\Controllers\MunicipalityController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\PhoReportController;
use App\Http\Controllers\PregnancyController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RhuDesignationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RoleTypeController;
use App\Http\Controllers\SitioController;
use App\Http\Controllers\SummaryTableController;
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
    Route::post("", [UserController::class, "store"]);
    Route::get("get-bhws-by-captain/{user_id}", [UserController::class, "getBhwsByCaptain"]);
    Route::post("add-bhw", [UserController::class, "addBhw"]);
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
        Route::get("get-members/{household_id}", [HouseholdController::class, "getMembers"]);
        Route::get("count-pregnants/{household_id}", [HouseholdController::class, "countPregnants"]);
        Route::get("count-seniors/{household_id}", [HouseholdController::class, "countSeniors"]);
        Route::get("count-by-barangay/{barangay_id}", [HouseholdController::class, "countByBarangay"]);
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
        Route::get("family-heads/{household_id}", [HouseholdProfileController::class, "getFamilyHeads"]);
        Route::post("set-household-head/{household_profile_id}", [HouseholdProfileController::class, "setHouseholdHead"]);
        Route::post("set-family-head/{household_profile_id}", [HouseholdProfileController::class, "setFamilyHead"]);
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
        Route::post("medication", [HealthcareServiceController::class, "storeMedication"]);
        Route::get("monthly-records", [HealthcareServiceController::class, "getMonthlyRecords"]);
    });
});

Route::prefix("reports")->group(function () {
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("summary-report", [ReportController::class, "getSummaryReport"]);
        Route::get("submitted", [ReportController::class, "submitted"]);
        Route::get("for-approval", [ReportController::class, "forApproval"]);
        Route::post("submit", [ReportController::class, "submit"]);
        Route::post("resubmit/{id}", [ReportController::class, "resubmit"]);
        Route::post("reject/{id}", [ReportController::class, "reject"]);
        Route::post("approve/{id}", [ReportController::class, "approve"]);
        Route::delete("delete/{id}", [ReportController::class, "delete"]);
        Route::get("get/{id}", [ReportController::class, "getReportById"]);
    });
});

Route::prefix("role-types")->group(function () {
    Route::get("", [RoleTypeController::class, "index"]);
});

Route::prefix("bhw-designations")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("", [BhwDesignationController::class, "store"]);
        Route::get("get-by-user-id", [BhwDesignationController::class, "getDesignationsByUserId"]);
    });
});

Route::prefix("captain-designations")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("", [CaptainDesignationController::class, "store"]);
        Route::get("get-by-user-id/{user_id}", [CaptainDesignationController::class, "getDesignationByUserId"]);
        Route::get("get-sitios/{user_id}", [CaptainDesignationController::class, "getSitios"]);
    });
});

Route::prefix("midwife-designations")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("", [MidwifeDesignationController::class, "store"]);
        Route::get("get-by-user-id", [MidwifeDesignationController::class, "getDesignationsByUserId"]);
    });
});

Route::prefix("rhu-designations")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("", [RhuDesignationController::class, "store"]);
        Route::get("get-by-user-id", [RhuDesignationController::class, "getDesignationByUserId"]);
    });
});

Route::prefix("sitios")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::post("", [SitioController::class, "store"]);
        Route::get("", [SitioController::class, "index"]);
        Route::delete("/{id}", [SitioController::class, "destroy"]);
        Route::put("/{id}", [SitioController::class, "update"]);
    });
});

Route::prefix("dashboard")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("bhw", [DashboardController::class, "getBhwDashboard"]);
        Route::get("midwife", [MidwifeDashboardController::class, "getMidwifeDashboard"]);
    });
});

Route::prefix("maternal-clients")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("get-candidates", [MaternalClientController::class, "getCandidates"]);
        Route::get("", [MaternalClientController::class, "getClients"]);
        Route::get("get-by-id/{id}", [MaternalClientController::class, "getClientById"]);
        Route::post("register", [MaternalClientController::class, "register"]);
        Route::post("update", [MaternalClientController::class, "update"]);
        Route::delete("delete/{id}", [MaternalClientController::class, "delete"]);
    });
});

Route::prefix("childcare-clients")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("get-candidates", [ChildcareClientController::class, "getCandidates"]);
        Route::post("register", [ChildcareClientController::class, "register"]);
        Route::post("update", [ChildcareClientController::class, "update"]);
        Route::delete("delete/{id}", [ChildcareClientController::class, "delete"]);
        Route::get("", [ChildcareClientController::class, "getClients"]);
        Route::get("get-by-id/{id}", [ChildcareClientController::class, "getClientById"]);
    });
});

Route::prefix("family-planning-clients")->group(function(){
    Route::middleware("auth:sanctum")->group(function () {
        Route::get("get-candidates", [FamilyPlanningClientController::class, "getCandidates"]);
        Route::post("register", [FamilyPlanningClientController::class, "register"]);
        Route::post("update", [FamilyPlanningClientController::class, "update"]);
        Route::delete("delete/{id}", [FamilyPlanningClientController::class, "delete"]);
        Route::get("", [FamilyPlanningClientController::class, "getClients"]);
        Route::get("get-by-id/{id}", [FamilyPlanningClientController::class, "getClientById"]);
    });
});

Route::prefix('summary-tables')->group(function(){
    Route::get("environmental", [SummaryTableController::class, "getEnvnironmentalSummaryTable"]);
    Route::get("family-planning", [SummaryTableController::class, "getFamilyPlanningSummaryTable"]);
});


Route::prefix('pho-reports')->group(function(){
    Route::get("environmental", [PhoReportController::class, "environmental"]);
});

