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
        Schema::create('maternal_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_profile_id');
            $table->date('date_of_registration');
            $table->string('first_name', 100);
            $table->string('middle_name', 100);
            $table->string('last_name', 100);
            $table->foreignId('address_barangay_id');
            $table->date('lmp')->nullable();
            $table->integer('gravida')->nullable();
            $table->integer('parity')->nullable();
            $table->date('edc')->nullable();
            $table->boolean('has_nearby_facility')->default(false);
            $table->boolean('is_hypertensive')->default(false);
            $table->date('first_tri_checkup_date')->nullable();
            $table->date('second_tri_checkup_date')->nullable();
            $table->date('third_tri_checkup_date_a')->nullable();
            $table->date('third_tri_checkup_date_b')->nullable();
            $table->date('tt1_date')->nullable();
            $table->date('tt2_date')->nullable();
            $table->date('tt3_date')->nullable();           
            $table->date('tt4_date')->nullable();
            $table->date('tt5_date')->nullable();
            $table->date('iodine_capsule_date_given')->nullable();
            $table->double('first_tri_bmi')->nullable();
            $table->date('deworming_tablet_date_given')->nullable();
            $table->date('gestational_diabetes_screening_date')->nullable();
            $table->boolean('is_gestational_diabetes_positive')->nullable();
            $table->date('cbc_date')->nullable();
            $table->date('has_anemia')->nullable();
            $table->boolean('given_iron')->nullable();
            $table->string('remarks', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maternal_clients');
    }
};
