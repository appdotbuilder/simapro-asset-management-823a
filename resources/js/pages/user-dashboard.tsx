import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Stats {
    total_requests: number;
    pending_requests: number;
    active_borrowings: number;
}

interface BorrowingRequest {
    id: number;
    request_code: string;
    asset: {
        id: number;
        name: string;
        asset_code: string;
    };
    borrow_date: string;
    return_date: string;
    status: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    myRequests: BorrowingRequest[];
    activeBorrowings: BorrowingRequest[];
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

export default function UserDashboard({ stats, myRequests, activeBorrowings }: Props) {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">👤 My Dashboard</h1>
                    <p className="text-gray-600 mt-1">Your borrowing activity and asset access</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 text-lg">📝</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_requests}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span className="text-yellow-600 text-lg">⏳</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending_requests}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 text-lg">📦</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Currently Borrowed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active_borrowings}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white mb-8">
                    <h2 className="text-lg font-semibold mb-4">🚀 Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/assets">
                            <Button variant="secondary" size="sm">
                                📚 Browse Catalog
                            </Button>
                        </Link>
                        <Link href="/borrowing">
                            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                                📝 My Requests
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                            🔧 Report Damage
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Requests */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">📝 Recent Requests</h2>
                                <Link href="/borrowing">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {myRequests.length > 0 ? (
                                <div className="space-y-4">
                                    {myRequests.map((request) => (
                                        <div key={request.id} className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{request.asset.name}</p>
                                                <p className="text-sm text-gray-600">Code: {request.request_code}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(request.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                {getStatusBadge(request.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📝</div>
                                    <p className="text-gray-500">No requests yet</p>
                                    <Link href="/assets" className="mt-2 inline-block">
                                        <Button variant="outline" size="sm">
                                            Browse Assets
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Borrowings */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">📦 Currently Borrowed</h2>
                        </div>
                        <div className="p-6">
                            {activeBorrowings.length > 0 ? (
                                <div className="space-y-4">
                                    {activeBorrowings.map((borrowing) => (
                                        <div key={borrowing.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="font-medium text-gray-900">{borrowing.asset.name}</p>
                                                {getStatusBadge(borrowing.status)}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                Asset Code: {borrowing.asset.asset_code}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Return by: {new Date(borrowing.return_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                            <div className="mt-2 flex space-x-2">
                                                <Link href={`/borrowing/${borrowing.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                                                    🔧 Report Issue
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📦</div>
                                    <p className="text-gray-500 mb-2">No active borrowings</p>
                                    <p className="text-sm text-gray-400 mb-3">
                                        Submit a request to start borrowing assets
                                    </p>
                                    <Link href="/assets">
                                        <Button size="sm">
                                            Browse Catalog
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips</h3>
                    <ul className="space-y-2 text-blue-800">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Submit requests early to ensure asset availability</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Return assets on time to maintain your borrowing privileges</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Report any damage immediately to avoid penalties</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Check your email for status updates on requests</span>
                        </li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}