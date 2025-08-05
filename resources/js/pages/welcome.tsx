import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

export default function Welcome() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="text-6xl">🤝</span>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Personal CRM
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Keep track of your relationships, manage sales opportunities, and grow your business with our comprehensive Customer Relationship Management platform.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/login">
                                <Button size="lg" className="text-lg px-8 py-3">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                Contact Management
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Store and organize detailed information about your prospects and customers, including contact details, company info, and personal notes.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                Sales Pipeline
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Track sales opportunities from lead generation to deal closure with customizable stages, values, and probability tracking.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                Analytics & Reports
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get insights into your sales performance with comprehensive dashboards showing active leads, won deals, and customer metrics.
                            </p>
                        </div>
                    </div>

                    {/* Screenshots/Mockups */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                Dashboard Overview
                            </h4>
                            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg h-48 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="text-3xl mb-2">📈</div>
                                    <p>Real-time sales metrics</p>
                                    <p>Customer insights</p>
                                    <p>Performance tracking</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                Customer Profiles
                            </h4>
                            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg h-48 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="text-3xl mb-2">👤</div>
                                    <p>Detailed contact info</p>
                                    <p>Interaction history</p>
                                    <p>Sales opportunities</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-lg text-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                            Why Choose Our CRM?
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div>
                                <div className="text-2xl mb-2">⚡</div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Fast & Intuitive</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Clean, modern interface designed for productivity</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-2">🔒</div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Secure & Private</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Your data is protected with enterprise-grade security</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-2">📱</div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Mobile Ready</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Access your CRM from anywhere, on any device</p>
                            </div>
                            <div>
                                <div className="text-2xl mb-2">🚀</div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Scalable</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Grows with your business needs</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Ready to transform your business relationships?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Join thousands of professionals who trust our CRM to manage their customer relationships.
                        </p>
                        <Link href="/register">
                            <Button size="lg" className="text-lg px-8 py-3">
                                Start Your Free Trial 🚀
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}