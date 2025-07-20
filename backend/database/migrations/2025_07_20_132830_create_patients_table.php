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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_profile_id');
            $table->string('email');
            $table->string('contact_no', 10);
            $table->string('eci_firstname', 50);
            $table->string('eci_middlename', 50);
            $table->string('eci_lastname',50);
            $table->string('eci_relationship', 50);
            $table->string('eci_primary_contact', 50);
            $table->string('eci_secondary_contact', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
