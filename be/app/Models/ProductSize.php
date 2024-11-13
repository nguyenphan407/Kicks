<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    use HasFactory;
    protected $table = "product_size";
    protected $primaryKey = "product_size_id";
    protected $fillable = [
        "product_id",
        "size",
        "quantity",
    ];
    public function product()
    {
        return $this->belongsTo( Product::class, 'product_id');
    }
}
