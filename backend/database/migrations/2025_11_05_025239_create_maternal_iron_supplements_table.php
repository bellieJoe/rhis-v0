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
        Schema::create('maternal_supplements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_client_id');
            $table->unsignedTinyInteger('visit_number');
            $table->decimal('amount', 8, 2)->nullable();
            $table->date('given_date')->nullable();
            $table->enum('supplement_type', ['IRON SULFATE', 'CALCIUM CARBONATE']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maternal_supplements');
    }
};
