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
        Schema::create('new_borns', function (Blueprint $table) {
            $table->id();
            $table->foreignId("household_profile_id");
            $table->date("date_of_birth");
            $table->integer("place_of_birth");
            $table->double("weight");
            $table->integer("gender_id");
            $table->string("remarks", 500)->nullable();
            $table->integer("encoded_by");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_borns');
    }
};
