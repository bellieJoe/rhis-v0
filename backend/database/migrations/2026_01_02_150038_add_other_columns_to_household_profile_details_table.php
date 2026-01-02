<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('household_profile_details', function (Blueprint $table) {
            //
            $table->string('diabetes_maintenance', 200)->nullable();
            $table->string('hypertension_maintenance', 200)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('household_profile_details', function (Blueprint $table) {
            //
            $table->dropColumn('diabetes_maintenance');
            $table->dropColumn('hypertension_maintenance');
        });
    }
};
