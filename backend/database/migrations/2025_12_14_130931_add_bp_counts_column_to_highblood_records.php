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
        Schema::table('highblood_records', function (Blueprint $table) {
            //
            $table->integer("bp_counts")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('highblood_records', function (Blueprint $table) {
            //
            $table->dropColumn("bp_counts");
        });
    }
};
