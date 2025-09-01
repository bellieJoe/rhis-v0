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
        Schema::create('sick_records', function (Blueprint $table) {
            $table->id();
            $table->integer("household_profile_id");
            $table->date("date_of_sick");
            $table->integer("age");
            $table->string("type_of_sickness", 100);
            $table->integer("encoded_by");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sick_records');
    }
};
