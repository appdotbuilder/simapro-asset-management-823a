<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display the asset catalog.
     */
    public function index(Request $request)
    {
        $query = Asset::with(['category', 'location'])
            ->available()
            ->latest();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('asset_code', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhereHas('category', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location_id', $request->location);
        }

        $assets = $query->paginate(12);
        $categories = Category::orderBy('name')->get();
        $locations = Location::orderBy('name')->get();

        return Inertia::render('asset-catalog', [
            'assets' => $assets,
            'categories' => $categories,
            'locations' => $locations,
            'filters' => $request->only(['search', 'category', 'location']),
        ]);
    }

    /**
     * Display the specified asset.
     */
    public function show(Asset $asset)
    {
        $asset->load(['category', 'location', 'supplier']);

        return Inertia::render('asset-detail', [
            'asset' => $asset,
        ]);
    }
}