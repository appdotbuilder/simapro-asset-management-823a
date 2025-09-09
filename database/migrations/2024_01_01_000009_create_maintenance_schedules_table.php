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
        Schema::create('maintenance_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Maintenance title');
            $table->text('description')->nullable()->comment('Maintenance description');
            $table->date('scheduled_date')->comment('Scheduled maintenance date');
            $table->enum('type', ['preventive', 'corrective', 'emergency'])->comment('Maintenance type');
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled')->comment('Maintenance status');
            $table->decimal('estimated_cost', 10, 2)->nullable()->comment('Estimated cost');
            $table->decimal('actual_cost', 10, 2)->nullable()->comment('Actual cost');
            $table->text('notes')->nullable()->comment('Maintenance notes');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->datetime('started_at')->nullable()->comment('Maintenance start date');
            $table->datetime('completed_at')->nullable()->comment('Maintenance completion date');
            $table->timestamps();
            
            // Indexes
            $table->index(['asset_id', 'status']);
            $table->index('scheduled_date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_schedules');
    }
};