import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    status: string;
    created_at: string;
    sales_opportunities_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    customers: {
        data: Customer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    [key: string]: unknown;
}

export default function CustomersIndex({ customers }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppShell>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            👥 Customers
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage your customer relationships and contacts
                        </p>
                    </div>
                    <Link href="/customers/create">
                        <Button className="flex items-center space-x-2">
                            <span>➕</span>
                            <span>Add Customer</span>
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <p className="text-2xl font-bold">{customers.total}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Customers</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">✅</span>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {customers.data.filter(c => c.status === 'active').length}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Active Customers</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">💼</span>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {customers.data.reduce((sum, c) => sum + c.sales_opportunities_count, 0)}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Opportunities</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Customers List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Customers</CardTitle>
                        <CardDescription>
                            View and manage your customer database
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {customers.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-lg font-semibold mb-2">No customers yet</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Start building your customer database by adding your first customer.
                                </p>
                                <Link href="/customers/create">
                                    <Button>Add Your First Customer</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {customers.data.map((customer) => (
                                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {customer.name}
                                                </h3>
                                                <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                                                    {customer.status}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span>📧 {customer.email}</span>
                                                {customer.phone && <span>📞 {customer.phone}</span>}
                                                {customer.company && <span>🏢 {customer.company}</span>}
                                            </div>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                                                <span>Added {formatDate(customer.created_at)}</span>
                                                <span>{customer.sales_opportunities_count} opportunities</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link href={`/customers/${customer.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={`/customers/${customer.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {customers.last_page > 1 && (
                            <div className="flex justify-center space-x-2 mt-6">
                                {customers.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link href={link.url}>
                                                <Button
                                                    variant={link.active ? 'default' : 'outline'}
                                                    size="sm"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            </Link>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}