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
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('parent_id', 50)->nullable();
            $table->enum('office_type', ['pho', 'rhu', 'barangay']);
            $table->foreignId('address_barangay_id');
            $table->foreignId('municipality_id')->nullable();
            $table->foreignId('province_id')->nullable();
            $table->foreignId('barangay_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offices');
    }
};
