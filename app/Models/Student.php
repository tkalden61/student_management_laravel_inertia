<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $fillable = ['name', 'email', 'class_id', 'section_id'];

    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function scopeSearch(Builder $query, Request $request)
    {
        return $query->where(function($query) use($request) {
            $query->where('name', 'LIKE', "%" . $request->search . "%")
            ->orWhere('email', 'LIKE', "%" . $request->search . "%");
        });
    }
}
