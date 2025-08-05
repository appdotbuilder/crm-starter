import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Customer {
    id: number;
    name: string;
    company: string | null;
    email: string;
    created_at: string;
}

interface SalesOpportunity {
    id: number;
    title: string;
    value: number;
    stage: string;
    customer: {
        id: number;
        name: string;
        company: string | null;
    };
    created_at: string;
}

interface OpportunityByStage {
    stage: string;
    count: number;
    total_value: number;
}

interface Stats {
    totalCustomers: number;
    activeCustomers: number;
    totalOpportunities: number;
    activeOpportunities: number;
    totalOpportunityValue: number;
    wonDeals: number;
    wonDealsValue: number;
}

interface Props {
    stats: Stats;
    recentCustomers: Customer[];
    recentOpportunities: SalesOpportunity[];
    opportunitiesByStage: OpportunityByStage[];
    [key: string]: unknown;
}

export default function Dashboard({ 
    stats, 
    recentCustomers, 
    recentOpportunities, 
    opportunitiesByStage 
}: Props) {
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

    return (
        <AppShell>
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🏠 CRM Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Overview of your customer relationships and sales performance
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                            <span className="text-2xl">👥</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.activeCustomers} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                            <span className="text-2xl">💰</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.totalOpportunityValue)}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.activeOpportunities} active opportunities
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Won Deals</CardTitle>
                            <span className="text-2xl">🎉</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.wonDeals}</div>
                            <p className="text-xs text-muted-foreground">
                                {formatCurrency(stats.wonDealsValue)} total value
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
                            <span className="text-2xl">📈</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
                            <p className="text-xs text-muted-foreground">
                                All time tracking
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Pipeline Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Pipeline by Stage</CardTitle>
                            <CardDescription>Active opportunities breakdown</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {opportunitiesByStage.map((stage) => (
                                    <div key={stage.stage} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(stage.stage)}`}>
                                                {getStageLabel(stage.stage)}
                                            </span>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {stage.count} opportunities
                                            </span>
                                        </div>
                                        <span className="font-medium">
                                            {formatCurrency(stage.total_value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Customers</CardTitle>
                                <CardDescription>Latest customer additions</CardDescription>
                            </div>
                            <Link href="/customers">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentCustomers.map((customer) => (
                                    <div key={customer.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{customer.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {customer.company || customer.email}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {formatDate(customer.created_at)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Opportunities */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Opportunities</CardTitle>
                            <CardDescription>Latest sales opportunities</CardDescription>
                        </div>
                        <Link href="/opportunities">
                            <Button variant="outline" size="sm">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOpportunities.map((opportunity) => (
                                <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h4 className="font-medium">{opportunity.title}</h4>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(opportunity.stage)}`}>
                                                {getStageLabel(opportunity.stage)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {opportunity.customer.name}
                                            {opportunity.customer.company && ` - ${opportunity.customer.company}`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">{formatCurrency(opportunity.value)}</div>
                                        <div className="text-xs text-gray-500">
                                            {formatDate(opportunity.created_at)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="mt-8 flex gap-4">
                    <Link href="/customers/create">
                        <Button className="flex items-center space-x-2">
                            <span>👤</span>
                            <span>Add Customer</span>
                        </Button>
                    </Link>
                    <Link href="/opportunities/create">
                        <Button variant="outline" className="flex items-center space-x-2">
                            <span>💼</span>
                            <span>New Opportunity</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}