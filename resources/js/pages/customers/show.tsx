import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SalesOpportunity {
    id: number;
    title: string;
    value: number;
    stage: string;
    probability: number;
    expected_close_date: string | null;
    created_at: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    address: string | null;
    notes: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    sales_opportunities: SalesOpportunity[];
}

interface Props {
    customer: Customer;
    [key: string]: unknown;
}

export default function ShowCustomer({ customer }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStageLabel = (stage: string) => {
        const labels: Record<string, string> = {
            'lead': 'Lead',
            'qualified': 'Qualified',
            'proposal': 'Proposal',
            'negotiation': 'Negotiation',
            'closed_won': 'Closed Won',
            'closed_lost': 'Closed Lost',
        };
        return labels[stage] || stage;
    };

    const getStageColor = (stage: string) => {
        const colors: Record<string, string> = {
            'lead': 'bg-gray-100 text-gray-800',
            'qualified': 'bg-blue-100 text-blue-800',
            'proposal': 'bg-yellow-100 text-yellow-800',
            'negotiation': 'bg-orange-100 text-orange-800',
            'closed_won': 'bg-green-100 text-green-800',
            'closed_lost': 'bg-red-100 text-red-800',
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
            router.delete(`/customers/${customer.id}`);
        }
    };

    const activeOpportunities = customer.sales_opportunities.filter(
        opp => !['closed_won', 'closed_lost'].includes(opp.stage)
    );
    const totalOpportunityValue = activeOpportunities.reduce((sum, opp) => sum + opp.value, 0);

    return (
        <AppShell>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                👤 {customer.name}
                            </h1>
                            <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                                {customer.status}
                            </Badge>
                        </div>
                        {customer.company && (
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
                                🏢 {customer.company}
                            </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-300">
                            Customer since {formatDate(customer.created_at)}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/customers/${customer.id}/edit`}>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <span>✏️</span>
                                <span>Edit</span>
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            className="flex items-center space-x-2"
                        >
                            <span>🗑️</span>
                            <span>Delete</span>
                        </Button>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="mt-1 flex items-center space-x-2">
                                            <span>📧</span>
                                            <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
                                                {customer.email}
                                            </a>
                                        </p>
                                    </div>
                                    {customer.phone && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Phone</label>
                                            <p className="mt-1 flex items-center space-x-2">
                                                <span>📞</span>
                                                <a href={`tel:${customer.phone}`} className="text-blue-600 hover:underline">
                                                    {customer.phone}
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                {customer.address && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Address</label>
                                        <p className="mt-1 flex items-start space-x-2">
                                            <span>🏠</span>
                                            <span className="whitespace-pre-line">{customer.address}</span>
                                        </p>
                                    </div>
                                )}

                                {customer.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Notes</label>
                                        <p className="mt-1 flex items-start space-x-2">
                                            <span>📝</span>
                                            <span className="whitespace-pre-line">{customer.notes}</span>
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Sales Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {customer.sales_opportunities.length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Total Opportunities
                                    </div>
                                </div>
                                
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {formatCurrency(totalOpportunityValue)}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Active Pipeline Value
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {customer.sales_opportunities.filter(o => o.stage === 'closed_won').length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Won Deals
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sales Opportunities */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Sales Opportunities</CardTitle>
                            <CardDescription>Track deals and opportunities with this customer</CardDescription>
                        </div>
                        <Link href={`/opportunities/create?customer_id=${customer.id}`}>
                            <Button className="flex items-center space-x-2">
                                <span>➕</span>
                                <span>New Opportunity</span>
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {customer.sales_opportunities.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💼</div>
                                <h3 className="text-lg font-semibold mb-2">No opportunities yet</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Start tracking sales opportunities with this customer.
                                </p>
                                <Link href={`/opportunities/create?customer_id=${customer.id}`}>
                                    <Button>Create First Opportunity</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {customer.sales_opportunities.map((opportunity) => (
                                    <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {opportunity.title}
                                                </h4>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(opportunity.stage)}`}>
                                                    {getStageLabel(opportunity.stage)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span>💰 {formatCurrency(opportunity.value)}</span>
                                                <span>📊 {opportunity.probability}% probability</span>
                                                {opportunity.expected_close_date && (
                                                    <span>📅 Expected: {formatDate(opportunity.expected_close_date)}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link href={`/opportunities/${opportunity.id}`}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={`/opportunities/${opportunity.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
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