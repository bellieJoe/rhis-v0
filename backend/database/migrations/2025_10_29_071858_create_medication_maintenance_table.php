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
        Schema::create('medication_maintenance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('household_profile_id');
            $table->foreignId('medication_id');
            $table->date('other_medication', 100)->nullable();
            $table->integer('encoded_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medication_maintenance');
    }
};
