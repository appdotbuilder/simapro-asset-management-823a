import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Stats {
    total_assets: number;
    available_assets: number;
    borrowed_assets: number;
    maintenance_assets: number;
    damaged_assets: number;
    pending_requests: number;
    active_borrowings: number;
    pending_maintenance: number;
}

interface BorrowingRequest {
    id: number;
    request_code: string;
    asset: {
        name: string;
        asset_code: string;
    };
    borrower_name: string;
    borrower_email: string;
    created_at: string;
}

interface MaintenanceSchedule {
    id: number;
    asset: {
        name: string;
        asset_code: string;
    };
    title: string;
    scheduled_date: string;
    type: string;
}



interface Props {
    stats: Stats;
    recentRequests: BorrowingRequest[];
    upcomingMaintenance: MaintenanceSchedule[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentRequests, upcomingMaintenance }: Props) {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">🏢 SIMAPRO Dashboard</h1>
                    <p className="text-gray-600 mt-1">Asset and borrowing management overview</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 text-lg">📦</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 text-lg">✅</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Available</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.available_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span className="text-yellow-600 text-lg">📋</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Borrowed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.borrowed_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <span className="text-red-600 text-lg">⏳</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending_requests}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 text-lg">🔧</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.maintenance_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 text-lg">⚠️</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Damaged</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.damaged_assets}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <span className="text-indigo-600 text-lg">🤝</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Loans</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active_borrowings}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600 text-lg">📅</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Scheduled Maintenance</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending_maintenance}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Requests */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">📝 Recent Borrowing Requests</h2>
                        </div>
                        <div className="p-6">
                            {recentRequests.length > 0 ? (
                                <div className="space-y-4">
                                    {recentRequests.map((request) => (
                                        <div key={request.id} className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-gray-900">{request.asset.name}</p>
                                                <p className="text-sm text-gray-600">{request.borrower_name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(request.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                                Pending
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent requests</p>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Maintenance */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">🔧 Upcoming Maintenance</h2>
                        </div>
                        <div className="p-6">
                            {upcomingMaintenance.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingMaintenance.map((maintenance) => (
                                        <div key={maintenance.id} className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-gray-900">{maintenance.asset.name}</p>
                                                <p className="text-sm text-gray-600">{maintenance.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(maintenance.scheduled_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                maintenance.type === 'emergency' 
                                                    ? 'bg-red-100 text-red-800'
                                                    : maintenance.type === 'corrective'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {maintenance.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No scheduled maintenance</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                    <h2 className="text-lg font-semibold mb-4">🚀 Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="secondary" size="sm">
                            📦 Manage Assets
                        </Button>
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                            📝 Process Requests
                        </Button>
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                            🔧 Schedule Maintenance
                        </Button>
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                            📊 Generate Reports
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}