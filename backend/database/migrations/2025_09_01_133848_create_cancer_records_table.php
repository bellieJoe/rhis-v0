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
        Schema::create('cancer_records', function (Blueprint $table) {
            $table->id();
            $table->integer("household_profile_id");
            $table->integer("age");
            $table->string("affected_areas", 500);
            $table->string("actions", 500);
            $table->integer("encoded_by");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cancer_records');
    }
};
