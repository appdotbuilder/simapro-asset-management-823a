<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\BorrowingRequestController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public asset catalog (can be accessed without login)
Route::controller(AssetController::class)->group(function () {
    Route::get('/assets', 'index')->name('assets.index');
    Route::get('/assets/{asset}', 'show')->name('assets.show');
});

// Public borrowing request submission
Route::post('/borrowing-requests', [BorrowingRequestController::class, 'store'])
    ->name('borrowing-requests.store');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // User borrowing management
    Route::controller(BorrowingRequestController::class)->prefix('borrowing')->name('borrowing.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{borrowingRequest}', 'show')->name('show');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
