import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Customer {
    id: number;
    name: string;
    email: string;
    company: string | null;
}

interface SalesOpportunity {
    id: number;
    title: string;
    description: string | null;
    value: number;
    stage: string;
    probability: number;
    expected_close_date: string | null;
    actual_close_date: string | null;
    created_at: string;
    updated_at: string;
    customer: Customer;
}

interface Props {
    opportunity: SalesOpportunity;
    [key: string]: unknown;
}

export default function ShowOpportunity({ opportunity }: Props) {
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
        if (confirm('Are you sure you want to delete this opportunity? This action cannot be undone.')) {
            router.delete(`/opportunities/${opportunity.id}`);
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                💼 {opportunity.title}
                            </h1>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStageColor(opportunity.stage)}`}>
                                {getStageLabel(opportunity.stage)}
                            </span>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
                            👤 {opportunity.customer.name}
                            {opportunity.customer.company && ` - ${opportunity.customer.company}`}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Created {formatDate(opportunity.created_at)}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/opportunities/${opportunity.id}/edit`}>
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

                {/* Opportunity Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Opportunity Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {opportunity.description && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Description</label>
                                        <p className="mt-1 whitespace-pre-line">{opportunity.description}</p>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Value</label>
                                        <p className="mt-1 text-2xl font-bold text-green-600">
                                            {formatCurrency(opportunity.value)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Probability</label>
                                        <p className="mt-1 text-2xl font-bold text-blue-600">
                                            {opportunity.probability}%
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {opportunity.expected_close_date && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Expected Close Date</label>
                                            <p className="mt-1 flex items-center space-x-2">
                                                <span>📅</span>
                                                <span>{formatDate(opportunity.expected_close_date)}</span>
                                            </p>
                                        </div>
                                    )}
                                    {opportunity.actual_close_date && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Actual Close Date</label>
                                            <p className="mt-1 flex items-center space-x-2">
                                                <span>✅</span>
                                                <span>{formatDate(opportunity.actual_close_date)}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                        {opportunity.customer.name}
                                    </div>
                                    {opportunity.customer.company && (
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {opportunity.customer.company}
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="mt-1 flex items-center space-x-2">
                                        <span>📧</span>
                                        <a href={`mailto:${opportunity.customer.email}`} className="text-blue-600 hover:underline">
                                            {opportunity.customer.email}
                                        </a>
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Link href={`/customers/${opportunity.customer.id}`}>
                                        <Button variant="outline" className="w-full">
                                            View Full Customer Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Expected Value:</span>
                                    <span className="font-medium">
                                        {formatCurrency(opportunity.value * (opportunity.probability / 100))}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Days in Pipeline:</span>
                                    <span className="font-medium">
                                        {Math.ceil((new Date().getTime() - new Date(opportunity.created_at).getTime()) / (1000 * 3600 * 24))}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Last Updated:</span>
                                    <span className="font-medium">
                                        {formatDate(opportunity.updated_at)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <Link href={`/opportunities/${opportunity.id}/edit`}>
                        <Button className="flex items-center space-x-2">
                            <span>✏️</span>
                            <span>Edit Opportunity</span>
                        </Button>
                    </Link>
                    <Link href="/opportunities">
                        <Button variant="outline">
                            Back to Opportunities
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}