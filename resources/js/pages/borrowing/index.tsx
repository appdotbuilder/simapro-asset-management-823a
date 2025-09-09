import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface BorrowingRequest {
    id: number;
    request_code: string;
    asset: {
        id: number;
        name: string;
        asset_code: string;
        category: {
            name: string;
        };
        location: {
            name: string;
        };
    };
    borrow_date: string;
    return_date: string;
    status: string;
    purpose: string;
    created_at: string;
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

interface Props {
    requests: {
        data: BorrowingRequest[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

const getStatusBadge = (status: string) => {
    const badges = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-blue-100 text-blue-800',
        borrowed: 'bg-green-100 text-green-800',
        returned: 'bg-gray-100 text-gray-800',
        rejected: 'bg-red-100 text-red-800',
    };

    const icons = {
        pending: '⏳',
        approved: '✅',
        borrowed: '📦',
        returned: '✔️',
        rejected: '❌',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'}`}>
            <span className="mr-1">{icons[status as keyof typeof icons] || '❓'}</span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function BorrowingIndex({ requests }: Props) {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">📝 My Borrowing Requests</h1>
                            <p className="text-gray-600 mt-1">
                                Track your borrowing requests and manage active loans
                            </p>
                        </div>
                        <Link href="/assets">
                            <Button>
                                📚 Browse Catalog
                            </Button>
                        </Link>
                    </div>
                </div>

                {requests.data.length > 0 ? (
                    <div className="space-y-6">
                        {requests.data.map((request) => (
                            <div key={request.id} className="bg-white rounded-lg shadow-sm border p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {request.asset.name}
                                            </h3>
                                            {getStatusBadge(request.status)}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Request Code: <span className="font-medium">{request.request_code}</span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Asset Code: {request.asset.asset_code}
                                        </p>
                                    </div>
                                    <Link href={`/borrowing/${request.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
                                        <p className="text-sm text-gray-900">📂 {request.asset.category.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Location</label>
                                        <p className="text-sm text-gray-900">📍 {request.asset.location.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Borrow Date</label>
                                        <p className="text-sm text-gray-900">
                                            {new Date(request.borrow_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Return Date</label>
                                        <p className="text-sm text-gray-900">
                                            {new Date(request.return_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-xs font-medium text-gray-500 block mb-1">Purpose</label>
                                    <p className="text-sm text-gray-900 line-clamp-2">
                                        {request.purpose}
                                    </p>
                                </div>

                                <div className="text-xs text-gray-500">
                                    Submitted on {new Date(request.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        {requests.meta.last_page > 1 && (
                            <div className="flex justify-center space-x-2 mt-8">
                                {requests.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (link.url) {
                                                window.location.href = link.url;
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
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Borrowing Requests</h3>
                        <p className="text-gray-600 mb-4">
                            You haven't submitted any borrowing requests yet.
                        </p>
                        <Link href="/assets">
                            <Button>
                                📚 Browse Asset Catalog
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}