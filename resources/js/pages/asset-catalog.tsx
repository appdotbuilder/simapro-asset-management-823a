import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Asset {
    id: number;
    asset_code: string;
    name: string;
    photos: string[] | null;
    category: {
        name: string;
    };
    location: {
        name: string;
    };
    brand?: string;
    status: string;
}

interface Category {
    id: number;
    name: string;
}

interface Location {
    id: number;
    name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    last_page: number;
    current_page: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    assets: {
        data: Asset[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: Category[];
    locations: Location[];
    filters: {
        search?: string;
        category?: string;
        location?: string;
    };
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export default function AssetCatalog({ assets, categories, locations, filters, auth }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedLocation, setSelectedLocation] = useState(filters.location || '');

    const handleFilter = () => {
        router.get('/assets', {
            search: searchTerm,
            category: selectedCategory,
            location: selectedLocation,
        }, {
            preserveState: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedLocation('');
        router.get('/assets');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">S</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">SIMAPRO</span>
                            </Link>
                            <span className="text-gray-300">|</span>
                            <h1 className="text-lg font-semibold text-gray-900">📚 Asset Catalog</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="outline" size="sm">Dashboard</Button>
                                    </Link>
                                    <Link href="/borrowing">
                                        <Button size="sm">My Borrowings</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="outline" size="sm">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm">Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🔍 Search Assets
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, code, or brand..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📂 Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📍 Location
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Locations</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <Button onClick={handleFilter} className="flex-1">
                                Filter
                            </Button>
                            <Button onClick={clearFilters} variant="outline">
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing {assets.data.length} of {assets.meta.total} available assets
                    </p>
                    <div className="text-sm text-gray-500">
                        ✅ Available for borrowing
                    </div>
                </div>

                {/* Asset Grid */}
                {assets.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {assets.data.map((asset) => (
                            <div key={asset.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                                    {asset.photos && asset.photos.length > 0 ? (
                                        <img
                                            src={asset.photos[0]}
                                            alt={asset.name}
                                            className="w-full h-full object-cover rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="text-6xl text-gray-400">📦</div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                                            {asset.name}
                                        </h3>
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                            Available
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">
                                        Code: {asset.asset_code}
                                    </p>
                                    {asset.brand && (
                                        <p className="text-xs text-gray-500 mb-1">
                                            Brand: {asset.brand}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mb-1">
                                        📂 {asset.category.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        📍 {asset.location.name}
                                    </p>
                                    <Link href={`/assets/${asset.id}`}>
                                        <Button className="w-full" size="sm">
                                            View Details & Borrow
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assets Found</h3>
                        <p className="text-gray-600 mb-4">
                            No assets match your current search criteria.
                        </p>
                        <Button onClick={clearFilters} variant="outline">
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {assets.meta.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {assets.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url);
                                    }
                                }}
                                disabled={!link.url}
                                className={`px-3 py-2 text-sm rounded ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-700 border hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}