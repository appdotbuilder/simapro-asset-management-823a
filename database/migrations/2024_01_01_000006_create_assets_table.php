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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_code')->unique()->comment('Unique asset code');
            $table->string('name')->comment('Asset name');
            $table->json('photos')->nullable()->comment('Asset photos (JSON array)');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('brand')->nullable()->comment('Asset brand');
            $table->string('serial_number')->nullable()->comment('Serial number');
            $table->text('specifications')->nullable()->comment('Asset specifications');
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->foreignId('supplier_id')->nullable()->constrained()->onDelete('set null');
            $table->date('purchase_date')->nullable()->comment('Purchase date');
            $table->decimal('purchase_price', 12, 2)->nullable()->comment('Purchase price');
            $table->enum('status', ['available', 'borrowed', 'maintenance', 'damaged', 'deleted'])
                  ->default('available')->comment('Asset status');
            $table->text('qr_code')->nullable()->comment('QR code data');
            $table->timestamps();
            
            // Indexes
            $table->index('asset_code');
            $table->index('name');
            $table->index('status');
            $table->index(['status', 'category_id']);
            $table->index(['status', 'location_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};