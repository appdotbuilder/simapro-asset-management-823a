import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">SIMAPRO</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/assets" className="text-gray-600 hover:text-gray-900">
                                📚 Browse Catalog
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="sm">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center space-x-2 mb-4">
                            <span className="text-5xl">🏢</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                                SIMAPRO
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            <span className="font-semibold text-blue-600">Sistem Manajemen Aset & Peminjaman Pro</span>
                            <br />
                            Modern, intuitive, and efficient asset management system for your organization
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="text-3xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Asset Management</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Complete asset lifecycle tracking</li>
                                <li>• QR code generation & scanning</li>
                                <li>• Photo documentation</li>
                                <li>• Category & location management</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="text-3xl mb-4">🤝</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Borrowing System</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Self-service borrowing portal</li>
                                <li>• Request approval workflow</li>
                                <li>• Real-time status tracking</li>
                                <li>• Automated notifications</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg border">
                            <div className="text-3xl mb-4">🔧</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Maintenance & Reports</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Scheduled maintenance tracking</li>
                                <li>• Damage reporting system</li>
                                <li>• Comprehensive analytics</li>
                                <li>• Export to Excel/PDF</li>
                            </ul>
                        </div>
                    </div>

                    {/* User Roles */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">👥 Role-Based Access Control</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">👑</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">Admin</h3>
                                <p className="text-sm text-gray-600 mt-2">Full system access, master data management, user management</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">⚙️</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">Staff</h3>
                                <p className="text-sm text-gray-600 mt-2">Request processing, inventory management, maintenance scheduling</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h3 className="font-semibold text-gray-900">User</h3>
                                <p className="text-sm text-gray-600 mt-2">Browse catalog, submit requests, track borrowings</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">🚀 Ready to Get Started?</h2>
                        <p className="text-blue-100 mb-6">
                            Explore our asset catalog or create an account to start managing your assets efficiently
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/assets">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                    📚 Browse Asset Catalog
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                                    ✨ Create Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center items-center space-x-2 mb-4">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">S</span>
                        </div>
                        <span className="font-semibold">SIMAPRO</span>
                    </div>
                    <p className="text-gray-400">
                        Professional Asset & Borrowing Management System
                    </p>
                </div>
            </footer>
        </div>
    );
}