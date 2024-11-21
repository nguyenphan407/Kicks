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
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('name', 100);
            $table->string('brand', 50);
            $table->string('gender', 50);
            $table->text('description');
            $table->decimal('regular_price', 10, 2);
            $table->decimal('price', 10, 2);
            $table->integer('stock_quantity')->default(0);
            $table->string('color', 30);
            $table->foreignId('category_id')->references('category_id')->on('categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
