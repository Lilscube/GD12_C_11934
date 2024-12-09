<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contents;
use App\Models\Komentar;

class KomentarController extends Controller
{
    /**
     * Mendapatkan semua komentar untuk konten tertentu
     */
    public function index($contentId)
    {
        $content = Contents::with('komentars.user')->find($contentId);
    
        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }
    
       
        $komentars = $content->komentars()->with('user')->paginate(10); 
    
        return response()->json([
            'message' => 'Comments retrieved successfully',
            'data' => $komentars, 
        ], 200);
    }

    /**
     * Menyimpan komentar baru untuk konten tertentu
     */
    public function store(Request $request, $contentId)
    {
        // Validasi input
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'comment' => 'required|string|max:255',
        ], [
            'user_id.required' => 'User ID is required',
            'user_id.exists' => 'User ID does not exist',
            'comment.required' => 'Comment cannot be empty',
            'comment.max' => 'Comment cannot exceed 255 characters',
        ]);

        $content = Contents::find($contentId);

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        // Menyimpan komentar
        $komentar = $content->komentars()->create([
            'user_id' => $request->user_id,
            'comment' => $request->comment,
            'date_added' => now(), 
        ]);

        return response()->json([
            'message' => 'Comment added successfully',
            'data' => $komentar,
        ], 201);
    }

    /**
     * Menghapus komentar
     */
    public function destroy($contentId, $commentId)
    {
        $content = Contents::find($contentId);

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        $komentar = $content->komentars()->find($commentId);

        if (!$komentar) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $komentar->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }

    /**
     * Memperbarui komentar
     */
    public function update(Request $request, $contentId, $commentId)
    {
        // Validasi input
        $request->validate([
            'comment' => 'required|string|max:255',
        ], [
            'comment.required' => 'Comment cannot be empty',
            'comment.max' => 'Comment cannot exceed 255 characters',
        ]);

        $content = Contents::find($contentId);

        if (!$content) {
            return response()->json(['message' => 'Content not found'], 404);
        }

        $komentar = $content->komentars()->find($commentId);

        if (!$komentar) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        // Memperbarui komentar
        $komentar->update([
            'comment' => $request->comment,
        ]);

        return response()->json([
            'message' => 'Comment updated successfully',
            'data' => $komentar,
        ], 200);
    }
}
