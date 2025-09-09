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
        Schema::create('damage_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            $table->foreignId('reported_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('borrowing_request_id')->nullable()->constrained()->onDelete('set null');
            $table->text('description')->comment('Damage description');
            $table->json('photos')->nullable()->comment('Damage photos (JSON array)');
            $table->enum('severity', ['minor', 'moderate', 'major'])->comment('Damage severity');
            $table->enum('status', ['reported', 'under_repair', 'repaired', 'write_off'])->default('reported')->comment('Report status');
            $table->decimal('repair_cost', 10, 2)->nullable()->comment('Repair cost');
            $table->text('repair_notes')->nullable()->comment('Repair notes');
            $table->datetime('repaired_at')->nullable()->comment('Repair completion date');
            $table->timestamps();
            
            // Indexes
            $table->index(['asset_id', 'status']);
            $table->index('status');
            $table->index('reported_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('damage_reports');
    }
};