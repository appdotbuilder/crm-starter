import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


interface Customer {
    id: number;
    name: string;
    company: string | null;
}

interface SalesOpportunity {
    id: number;
    title: string;
    value: number;
    stage: string;
    probability: number;
    expected_close_date: string | null;
    created_at: string;
    customer: Customer;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    opportunities: {
        data: SalesOpportunity[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    [key: string]: unknown;
}

export default function OpportunitiesIndex({ opportunities }: Props) {
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

    const totalValue = opportunities.data.reduce((sum, opp) => sum + opp.value, 0);
    const activeOpportunities = opportunities.data.filter(opp => !['closed_won', 'closed_lost'].includes(opp.stage));
    const wonOpportunities = opportunities.data.filter(opp => opp.stage === 'closed_won');

    return (
        <AppShell>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            💼 Sales Opportunities
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Track and manage your sales pipeline
                        </p>
                    </div>
                    <Link href="/opportunities/create">
                        <Button className="flex items-center space-x-2">
                            <span>➕</span>
                            <span>New Opportunity</span>
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <p className="text-2xl font-bold">{opportunities.total}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Opportunities</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🔄</span>
                                <div>
                                    <p className="text-2xl font-bold">{activeOpportunities.length}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Active Pipeline</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">💰</span>
                                <div>
                                    <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Value</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🎉</span>
                                <div>
                                    <p className="text-2xl font-bold">{wonOpportunities.length}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Won Deals</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Opportunities List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Opportunities</CardTitle>
                        <CardDescription>
                            View and manage your sales opportunities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {opportunities.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💼</div>
                                <h3 className="text-lg font-semibold mb-2">No opportunities yet</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Start building your sales pipeline by creating your first opportunity.
                                </p>
                                <Link href="/opportunities/create">
                                    <Button>Create Your First Opportunity</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {opportunities.data.map((opportunity) => (
                                    <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {opportunity.title}
                                                </h3>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(opportunity.stage)}`}>
                                                    {getStageLabel(opportunity.stage)}
                                                </span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                                <span>👤 {opportunity.customer.name}</span>
                                                {opportunity.customer.company && <span>🏢 {opportunity.customer.company}</span>}
                                                <span>💰 {formatCurrency(opportunity.value)}</span>
                                                <span>📊 {opportunity.probability}%</span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                                                <span>Created {formatDate(opportunity.created_at)}</span>
                                                {opportunity.expected_close_date && (
                                                    <span>Expected close: {formatDate(opportunity.expected_close_date)}</span>
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

                        {/* Pagination */}
                        {opportunities.last_page > 1 && (
                            <div className="flex justify-center space-x-2 mt-6">
                                {opportunities.links.map((link, index) => (
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