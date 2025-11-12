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
        Schema::create('childcare_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('encoded_by');
            $table->foreignId('household_profile_id');
            $table->date('date_of_registration');
            $table->date('date_of_birth');
            $table->string('family_serial_number', 50)->nullable();
            $table->string('name_of_child', 100);
            $table->foreignId('sex');
            $table->string('complete_name_of_mother', 100);
            $table->string('complete_address', 100);
            $table->integer('cpab_a')->nullable();
            $table->integer('cpab_b')->nullable();
            $table->double('length');
            $table->double('weight');
            $table->date('initial_breastfeeding_duration')->nullable();
            $table->date('immunization_bcg')->nullable();
            $table->date('immunization_hepa_b')->nullable();
            $table->integer('nsa_age_13')->nullable();
            $table->double('nsa_length_13')->nullable();
            $table->date('nsa_length_date_13')->nullable();
            $table->double('nsa_weight_13')->nullable();
            $table->date('nsa_weight_date_13')->nullable();
            $table->string('nsa_status_13')->nullable();
            $table->date('lbwgi_1month_13')->nullable();
            $table->date('lbwgi_2month_13')->nullable();
            $table->date('lbwgi_3month_13')->nullable();
            $table->date('dhh_1st_dose_13')->nullable();
            $table->date('dhh_2nd_dose_13')->nullable();
            $table->date('dhh_3rd_dose_13')->nullable();
            $table->date('opv_1st_dose_13')->nullable();
            $table->date('opv_2nd_dose_13')->nullable();
            $table->date('opv_3rd_dose_13')->nullable();
            $table->date('pcv_1st_dose_13')->nullable();
            $table->date('pcv_2nd_dose_13')->nullable();
            $table->date('pcv_3rd_dose_13')->nullable();
            $table->date('ipv_1st_dose_13')->nullable();

            $table->integer('nsa_age_611')->nullable();
            $table->double('nsa_length_611')->nullable();
            $table->date('nsa_length_date_611')->nullable();
            $table->double('nsa_weight_611')->nullable();
            $table->date('nsa_weight_date_611')->nullable();
            $table->string('nsa_status_611')->nullable();
            $table->date('eb_611_date')->nullable();
            $table->boolean('eb_611')->nullable();
            $table->boolean('icf_1_611')->nullable();
            $table->integer('icf_2_611')->nullable();
            $table->date('vit_a_611')->nullable();
            $table->date('mnp_90_611')->nullable();
            $table->date('mnp_completed_611')->nullable();
            $table->date('mmr_611')->nullable();
            $table->date('ipv_dose2_611')->nullable();

            $table->integer('nsa_age_12')->nullable();
            $table->double('nsa_length_12')->nullable();
            $table->date('nsa_length_date_12')->nullable();
            $table->double('nsa_weight_12')->nullable();
            $table->date('nsa_weight_date_12')->nullable();
            $table->string('nsa_status_12')->nullable();
            $table->date('mmr_dose2_12')->nullable();
            $table->date('fic_12')->nullable();

            $table->date('cic')->nullable();

            $table->boolean('mam_admitted_011')->nullable();
            $table->boolean('mam_cured_011')->nullable();
            $table->boolean('mam_defaulted_011')->nullable();
            $table->boolean('mam_died_011')->nullable();
            $table->boolean('sam_admitted_011')->nullable();
            $table->boolean('sam_cured_011')->nullable();
            $table->boolean('sam_defaulted_011')->nullable();
            $table->boolean('sam_died_011')->nullable();

            $table->string('remarks', 5000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('childcare_clients');
    }
};
