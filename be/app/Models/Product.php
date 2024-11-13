<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = "product_id";

    protected $fillable = [
        "name",
        "brand",
        "gender",
        "description",
        "price",
        "stock_quantity",
        "size",
        "color",
        "image",
        "category_id",
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'product_id');
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class, 'product_id', 'product_id');
    }
}
