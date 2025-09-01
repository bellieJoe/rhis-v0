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
        Schema::create('fp_records', function (Blueprint $table) {
            $table->id();
            $table->integer("household_profile_id");
            $table->number("age");
            $table->integer("fp_method_id");
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
        Schema::dropIfExists('fp_records');
    }
};
