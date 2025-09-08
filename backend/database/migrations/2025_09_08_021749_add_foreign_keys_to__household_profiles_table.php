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
        Schema::table('household_profile_details', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });

        Schema::table('animal_bite_records', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('births', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('deaths', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('diabetes_records', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('epilepsy_records', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('fp_records', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('highblood_records', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('new_borns', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('pregnancies', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('sick_records', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('urinalysis_results', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
        Schema::table('vaccinateds', function (Blueprint $table) {
            //
            $table->foreign('household_profile_id')->references('id')->on('household_profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('household_profile_details', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('animal_bite_records', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('births', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('deaths', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('diabetes_records', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('epilepsy_records', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('fp_records', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('highblood_records', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('new_borns', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('pregnancies', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('sick_records', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('urinalysis_results', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
        Schema::table('vaccinateds', function (Blueprint $table) {
            //
            $table->dropForeign(['household_profile_id']);
        });
    }
};
