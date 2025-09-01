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
        Schema::create('births', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_profile_id');
            $table->integer('place_of_birth');
            $table->string('type_of_birth', 100);
            $table->string('midwife', 100);
            $table->date('date_gave_birth');
            $table->foreignId('encoded_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('births');
    }
};
