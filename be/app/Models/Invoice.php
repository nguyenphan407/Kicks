<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $primaryKey = "invoice_id";

    protected $fillable = [
        'number',
        'order_id',
        'due_date',
        'subject',
        'customer_name',
        'customer_email',
        'currency',
        'subtotal',
        'total',
    ];
}
