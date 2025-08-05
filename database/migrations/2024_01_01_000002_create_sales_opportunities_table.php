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
        Schema::create('sales_opportunities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('value', 10, 2);
            $table->enum('stage', ['lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'])->default('lead');
            $table->integer('probability')->default(10);
            $table->date('expected_close_date')->nullable();
            $table->date('actual_close_date')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('customer_id');
            $table->index('stage');
            $table->index('expected_close_date');
            $table->index(['stage', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_opportunities');
    }
};