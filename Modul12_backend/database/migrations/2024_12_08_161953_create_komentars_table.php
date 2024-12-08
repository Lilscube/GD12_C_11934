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
        Schema::create('komentars', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('id_user') // Foreign key untuk user
                  ->constrained('users') // Menunjukkan relasi ke tabel 'users'
                  ->onDelete('cascade'); // Jika user dihapus, komentar juga dihapus
            $table->foreignId('id_content') // Foreign key untuk content
                  ->constrained('contents') // Menunjukkan relasi ke tabel 'contents'
                  ->onDelete('cascade'); // Jika konten dihapus, komentar juga dihapus
            $table->text('comment'); // Kolom untuk menyimpan komentar
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentars');
    }
};
