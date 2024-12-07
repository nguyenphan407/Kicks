<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;

class Category extends Model implements Searchable
{
    use HasFactory;

    protected $primaryKey = "category_id";
    protected $fillable = [
        "category_name"
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    public function getSearchResult(): SearchResult
    {
        $url = route('category.show', ['id' => $this->category_id]);

        return new SearchResult(
            $this,
            $this->category_name,
            $url
        );
    }
}
