<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\BorrowingRequest;
use App\Models\DamageReport;
use App\Models\MaintenanceSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin() || $user->isStaff()) {
            return $this->adminStaffDashboard();
        }

        return $this->userDashboard();
    }

    /**
     * Dashboard for admin and staff users.
     */
    protected function adminStaffDashboard()
    {
        $stats = [
            'total_assets' => Asset::count(),
            'available_assets' => Asset::where('status', 'available')->count(),
            'borrowed_assets' => Asset::where('status', 'borrowed')->count(),
            'maintenance_assets' => Asset::where('status', 'maintenance')->count(),
            'damaged_assets' => Asset::where('status', 'damaged')->count(),
            'pending_requests' => BorrowingRequest::where('status', 'pending')->count(),
            'active_borrowings' => BorrowingRequest::where('status', 'borrowed')->count(),
            'pending_maintenance' => MaintenanceSchedule::where('status', 'scheduled')->count(),
        ];

        $recentRequests = BorrowingRequest::with(['asset', 'user'])
            ->where('status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        $upcomingMaintenance = MaintenanceSchedule::with(['asset'])
            ->where('status', 'scheduled')
            ->where('scheduled_date', '>=', now())
            ->orderBy('scheduled_date')
            ->take(5)
            ->get();

        $recentDamageReports = DamageReport::with(['asset', 'reporter'])
            ->where('status', 'reported')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests,
            'upcomingMaintenance' => $upcomingMaintenance,
            'recentDamageReports' => $recentDamageReports,
        ]);
    }

    /**
     * Dashboard for regular users.
     */
    protected function userDashboard()
    {
        $user = auth()->user();

        $myRequests = BorrowingRequest::with(['asset'])
            ->where('user_id', $user->id)
            ->orWhere('borrower_email', $user->email)
            ->latest()
            ->take(5)
            ->get();

        $activeBorrowings = BorrowingRequest::with(['asset'])
            ->where('status', 'borrowed')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                      ->orWhere('borrower_email', $user->email);
            })
            ->get();

        $stats = [
            'total_requests' => BorrowingRequest::where('user_id', $user->id)
                ->orWhere('borrower_email', $user->email)
                ->count(),
            'pending_requests' => BorrowingRequest::where('status', 'pending')
                ->where(function ($query) use ($user) {
                    $query->where('user_id', $user->id)
                          ->orWhere('borrower_email', $user->email);
                })
                ->count(),
            'active_borrowings' => $activeBorrowings->count(),
        ];

        return Inertia::render('user-dashboard', [
            'stats' => $stats,
            'myRequests' => $myRequests,
            'activeBorrowings' => $activeBorrowings,
        ]);
    }
}