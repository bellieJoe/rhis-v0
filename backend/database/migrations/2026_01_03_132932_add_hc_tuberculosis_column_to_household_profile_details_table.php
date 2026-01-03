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
            $table->boolean('hc_tuberculosis')->default(false)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('household_profile_details', function (Blueprint $table) {
            //
            $table->dropColumn('hc_tuberculosis');
        });
    }
};
