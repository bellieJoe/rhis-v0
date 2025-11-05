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
        Schema::create('maternal_infectious_diseases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_client_id');
            $table->enum('disease', ['HIV', 'SYPHILIS', 'HEPATITIS B']);
            $table->date('diagnosis_date')->nullable();
            $table->boolean('is_positive')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maternal_infectious_diseases');
    }
};
