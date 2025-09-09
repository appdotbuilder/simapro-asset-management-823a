<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBorrowingRequestRequest;
use App\Models\Asset;
use App\Models\BorrowingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BorrowingRequestController extends Controller
{
    /**
     * Display a listing of the user's borrowing requests.
     */
    public function index()
    {
        $user = auth()->user();
        
        $requests = BorrowingRequest::with(['asset.category', 'asset.location'])
            ->where('user_id', $user->id)
            ->orWhere('borrower_email', $user->email)
            ->latest()
            ->paginate(10);

        return Inertia::render('borrowing/index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Store a newly created borrowing request.
     */
    public function store(StoreBorrowingRequestRequest $request)
    {
        $asset = Asset::findOrFail($request->asset_id);

        // Check if asset is still available
        if ($asset->status !== 'available') {
            return back()->withErrors(['asset' => 'Asset is no longer available for borrowing.']);
        }

        $borrowingRequest = BorrowingRequest::create([
            'request_code' => 'BR-' . date('Ymd') . '-' . strtoupper(Str::random(6)),
            'asset_id' => $asset->id,
            'user_id' => auth()->id(),
            'borrower_name' => $request->borrower_name,
            'borrower_email' => $request->borrower_email,
            'borrower_id_number' => $request->borrower_id_number,
            'borrow_date' => $request->borrow_date,
            'return_date' => $request->return_date,
            'purpose' => $request->purpose,
            'status' => 'pending',
        ]);

        if (auth()->check()) {
            return redirect()->route('borrowing.index')
                ->with('success', 'Borrowing request submitted successfully! Request Code: ' . $borrowingRequest->request_code);
        }

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Borrowing request submitted successfully! Request Code: ' . $borrowingRequest->request_code);
    }

    /**
     * Display the specified borrowing request.
     */
    public function show(BorrowingRequest $borrowingRequest)
    {
        // Check if user can view this request
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isStaff() && 
            $borrowingRequest->user_id !== $user->id && 
            $borrowingRequest->borrower_email !== $user->email) {
            abort(403);
        }

        $borrowingRequest->load(['asset.category', 'asset.location', 'processor']);

        return Inertia::render('borrowing/show', [
            'request' => $borrowingRequest,
        ]);
    }
}