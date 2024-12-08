<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    use HasFactory;

    protected $table = 'komentars';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_user',
        'id_content',
        'comment',
        'date_added',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_added' => 'datetime', // Memastikan date_added diproses sebagai tanggal
    ];

    /**
     * Relasi ke model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id'); // Relasi dengan foreign key dan owner key
    }

    /**
     * Relasi ke model Contents.
     */
    public function content()
    {
        return $this->belongsTo(Contents::class, 'id_content', 'id'); // Relasi dengan foreign key dan owner key
    }

    /**
     * Accessor untuk memformat date_added.
     */
    public function getDateAddedAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d M Y, H:i'); // Format tanggal
    }
}
