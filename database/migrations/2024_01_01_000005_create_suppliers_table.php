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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Supplier name');
            $table->string('contact_person')->nullable()->comment('Contact person');
            $table->string('phone')->nullable()->comment('Phone number');
            $table->string('email')->nullable()->comment('Email address');
            $table->text('address')->nullable()->comment('Supplier address');
            $table->timestamps();
            
            // Indexes
            $table->index('name');
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};