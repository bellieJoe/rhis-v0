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
        Schema::create('household_profile_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_profile_id');
            $table->string('lastname', 50);
            $table->string('firstname', 50);
            $table->string('middlename', 50);
            $table->foreignId('member_relationship_id')->default(0);
            $table->string('other_relation', 50)->nullable();
            $table->foreignId('gender_id');
            $table->foreignId('civil_status_id');
            $table->foreignId('educational_attainment_id');
            $table->foreignId('religion_id')->default(0);
            $table->string('other_religion', 50)->nullable();
            $table->foreignId('unit_id')->nullable();
            // $table->foreignId('sitio_id_id');
            $table->enum('enthnicity', ['IP', 'Non-IP']);
            $table->boolean('fourps_member');
            $table->string('fourps_household_no', 50)->nullable();
            $table->string('philhealth_id', 50)->nullable();
            $table->foreignId('philheath_membership_type_id')->nullable();
            $table->foreignId('philhealth_category_id')->nullable();
            $table->foreignId('medical_history_id')->nullable();
            $table->string('other_medical_history', 50)->nullable();
            $table->foreignId('classification_by_age_hrg_id');
            $table->datetime('last_menstrual_period')->nullable();
            $table->boolean('is_using_fp_method')->nullable();
            $table->foreignId('family_planning_method_id')->nullable();
            $table->foreignId('family_planning_status_id')->nullable();
            $table->foreignId('water_source_type_id');
            $table->foreignId('toilet_facility_type_id');
            $table->boolean('hc_asthma')->nullable();
            $table->boolean('hc_cancer')->nullable();
            $table->boolean('hc_pwd')->nullable();
            $table->boolean('hc_stroke')->nullable();
            $table->boolean('hc_mass')->nullable();
            $table->boolean('hc_mhgap')->nullable();
            $table->boolean('hc_smoker')->nullable();
            $table->boolean('hc_alchohol_drinker')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('household_profile_details');
    }
};
