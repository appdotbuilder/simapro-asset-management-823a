import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
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
    supplier?: {
        name: string;
    };
    brand?: string;
    serial_number?: string;
    specifications?: string;
    purchase_date?: string;
    purchase_price?: string;
    status: string;
    qr_code?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    asset: Asset;
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export default function AssetDetail({ asset, auth }: Props) {
    const [showBorrowForm, setShowBorrowForm] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        asset_id: asset.id,
        borrower_name: auth.user?.name || '',
        borrower_email: auth.user?.email || '',
        borrower_id_number: '',
        borrow_date: '',
        return_date: '',
        purpose: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/borrowing-requests', {
            onSuccess: () => {
                setShowBorrowForm(false);
            },
        });
    };

    const nextPhoto = () => {
        if (asset.photos && currentPhotoIndex < asset.photos.length - 1) {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
        }
    };

    const prevPhoto = () => {
        if (currentPhotoIndex > 0) {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/assets" className="text-blue-600 hover:text-blue-800">
                                ← Back to Catalog
                            </Link>
                            <span className="text-gray-300">|</span>
                            <h1 className="text-lg font-semibold text-gray-900">Asset Details</h1>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Asset Photos */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                            {asset.photos && asset.photos.length > 0 ? (
                                <>
                                    <img
                                        src={asset.photos[currentPhotoIndex]}
                                        alt={asset.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {asset.photos.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevPhoto}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                                                disabled={currentPhotoIndex === 0}
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={nextPhoto}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                                                disabled={currentPhotoIndex === asset.photos.length - 1}
                                            >
                                                →
                                            </button>
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                                {currentPhotoIndex + 1} / {asset.photos.length}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-8xl text-gray-400">📦</div>
                                </div>
                            )}
                        </div>
                        
                        {/* Photo thumbnails */}
                        {asset.photos && asset.photos.length > 1 && (
                            <div className="flex space-x-2 overflow-x-auto">
                                {asset.photos.map((photo, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPhotoIndex(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                                            index === currentPhotoIndex ? 'border-blue-600' : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={photo}
                                            alt={`${asset.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Asset Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    ✅ Available
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Asset Code</label>
                                    <p className="text-gray-900">{asset.asset_code}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Category</label>
                                    <p className="text-gray-900">📂 {asset.category.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Location</label>
                                    <p className="text-gray-900">📍 {asset.location.name}</p>
                                </div>
                                {asset.brand && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Brand</label>
                                        <p className="text-gray-900">{asset.brand}</p>
                                    </div>
                                )}
                                {asset.serial_number && (
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-500">Serial Number</label>
                                        <p className="text-gray-900">{asset.serial_number}</p>
                                    </div>
                                )}
                            </div>

                            {asset.specifications && (
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-500 block mb-2">Specifications</label>
                                    <div className="bg-gray-50 rounded p-3 text-gray-900 whitespace-pre-wrap">
                                        {asset.specifications}
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={() => setShowBorrowForm(!showBorrowForm)}
                                className="w-full"
                                size="lg"
                                disabled={asset.status !== 'available'}
                            >
                                {showBorrowForm ? 'Cancel Request' : '📝 Request to Borrow'}
                            </Button>
                        </div>

                        {/* Additional Information */}
                        {(asset.supplier || asset.purchase_date || asset.purchase_price) && (
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchase Information</h2>
                                <div className="space-y-2">
                                    {asset.supplier && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Supplier</label>
                                            <p className="text-gray-900">{asset.supplier.name}</p>
                                        </div>
                                    )}
                                    {asset.purchase_date && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Purchase Date</label>
                                            <p className="text-gray-900">{new Date(asset.purchase_date).toLocaleDateString()}</p>
                                        </div>
                                    )}
                                    {asset.purchase_price && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Purchase Price</label>
                                            <p className="text-gray-900">Rp {parseFloat(asset.purchase_price).toLocaleString('id-ID')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Borrowing Form */}
                        {showBorrowForm && (
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Borrowing Request Form</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.borrower_name}
                                                onChange={(e) => setData('borrower_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.borrower_name && (
                                                <p className="text-red-600 text-sm mt-1">{errors.borrower_name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.borrower_email}
                                                onChange={(e) => setData('borrower_email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.borrower_email && (
                                                <p className="text-red-600 text-sm mt-1">{errors.borrower_email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Employee ID / ID Number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.borrower_id_number}
                                            onChange={(e) => setData('borrower_id_number', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Optional"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Borrow Date & Time *
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={data.borrow_date}
                                                onChange={(e) => setData('borrow_date', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.borrow_date && (
                                                <p className="text-red-600 text-sm mt-1">{errors.borrow_date}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Return Date & Time *
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={data.return_date}
                                                onChange={(e) => setData('return_date', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            {errors.return_date && (
                                                <p className="text-red-600 text-sm mt-1">{errors.return_date}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Purpose of Borrowing *
                                        </label>
                                        <textarea
                                            value={data.purpose}
                                            onChange={(e) => setData('purpose', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Please describe what you'll use this asset for..."
                                            required
                                        />
                                        {errors.purpose && (
                                            <p className="text-red-600 text-sm mt-1">{errors.purpose}</p>
                                        )}
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <Button type="submit" disabled={processing} className="flex-1">
                                            {processing ? 'Submitting...' : '✅ Submit Request'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowBorrowForm(false)}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}