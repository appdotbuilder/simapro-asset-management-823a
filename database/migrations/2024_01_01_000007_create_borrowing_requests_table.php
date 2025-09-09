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
        Schema::create('borrowing_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_code')->unique()->comment('Unique request code');
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('borrower_name')->comment('Borrower name');
            $table->string('borrower_email')->comment('Borrower email');
            $table->string('borrower_id_number')->nullable()->comment('Borrower ID number');
            $table->datetime('borrow_date')->comment('Requested borrow date');
            $table->datetime('return_date')->comment('Requested return date');
            $table->text('purpose')->comment('Purpose of borrowing');
            $table->enum('status', ['pending', 'approved', 'rejected', 'borrowed', 'returned'])
                  ->default('pending')->comment('Request status');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->datetime('processed_at')->nullable()->comment('Processing date');
            $table->datetime('actual_borrow_date')->nullable()->comment('Actual borrow date');
            $table->datetime('actual_return_date')->nullable()->comment('Actual return date');
            $table->timestamps();
            
            // Indexes
            $table->index('request_code');
            $table->index('status');
            $table->index('borrower_email');
            $table->index(['status', 'created_at']);
            $table->index(['asset_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowing_requests');
    }
};