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
        Schema::create('family_planning_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_profile_id');
            $table->foreignId('encoded_by');
            $table->date('date_of_registration');
            $table->string('family_serial_no')->nullable();
            $table->string('complete_name', 100);
            $table->string('complete_address', 100);
            $table->integer('age');
            $table->date('date_of_birth');
            $table->string('type_of_client', 100)->nullable();
            $table->string('source', 100)->nullable();
            $table->string('previous_method', 100)->nullable();
            $table->date('ff_jan')->nullable();
            $table->date('ff_feb')->nullable();
            $table->date('ff_mar')->nullable();
            $table->date('ff_apr')->nullable();
            $table->date('ff_may')->nullable();
            $table->date('ff_jun')->nullable();
            $table->date('ff_jul')->nullable();
            $table->date('ff_aug')->nullable();
            $table->date('ff_sep')->nullable();
            $table->date('ff_oct')->nullable();
            $table->date('ff_nov')->nullable();
            $table->date('ff_dec')->nullable();
            $table->date('dr_date')->nullable();
            $table->string('dr_reason', 100)->nullable();
            $table->string('remarks', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_planning_clients');
    }
};
