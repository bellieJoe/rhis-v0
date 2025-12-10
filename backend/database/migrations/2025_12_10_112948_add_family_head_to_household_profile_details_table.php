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
            //php
            $table->boolean('is_family_head')->default(false);
            $table->foreignId('family_head_id')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('household_profile_details', function (Blueprint $table) {
            //
        });
    }
};
