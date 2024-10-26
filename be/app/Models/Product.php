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
        "description",
        "price",
        "stock_quantity",
        "size",
        "color",
        "image",
        "category_id",
    ];
}
