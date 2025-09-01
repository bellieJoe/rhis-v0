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
        Schema::create('urinalysis_results', function (Blueprint $table) {
            $table->id();
            $table->integer("household_profile_id");
            $table->integer("age");
            $table->string("results", 500);
            $table->integer("encoded_by");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('urinalysis_results');
    }
};
