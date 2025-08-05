import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Customer {
    id: number;
    name: string;
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
    customer_id: number;
    customer: Customer;
}

interface Props {
    opportunity: SalesOpportunity;
    customers: Customer[];
    [key: string]: unknown;
}

export default function EditOpportunity({ opportunity, customers }: Props) {
    const [formData, setFormData] = useState({
        customer_id: opportunity.customer_id.toString(),
        title: opportunity.title,
        description: opportunity.description || '',
        value: opportunity.value.toString(),
        stage: opportunity.stage,
        probability: opportunity.probability.toString(),
        expected_close_date: opportunity.expected_close_date || '',
        actual_close_date: opportunity.actual_close_date || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.put(`/opportunities/${opportunity.id}`, formData, {
            onSuccess: () => {
                // Success handled by redirect
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleStageChange = (stage: string) => {
        // Auto-adjust probability based on stage
        const stageProbabilities: Record<string, string> = {
            'lead': '10',
            'qualified': '25',
            'proposal': '50',
            'negotiation': '75',
            'closed_won': '100',
            'closed_lost': '0',
        };

        const newFormData = {
            ...formData,
            stage,
            probability: stageProbabilities[stage] || formData.probability,
        };

        // Set actual close date for closed stages
        if (stage === 'closed_won' || stage === 'closed_lost') {
            if (!newFormData.actual_close_date) {
                newFormData.actual_close_date = new Date().toISOString().split('T')[0];
            }
        } else {
            newFormData.actual_close_date = '';
        }

        setFormData(newFormData);
    };

    return (
        <AppShell>
            <div className="container mx-auto p-6 max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        ✏️ Edit Opportunity
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Update details for "{opportunity.title}"
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Opportunity Details</CardTitle>
                        <CardDescription>
                            Update the information for this sales opportunity
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="customer_id">Customer *</Label>
                                <Select 
                                    value={formData.customer_id} 
                                    onValueChange={(value) => handleInputChange('customer_id', value)}
                                >
                                    <SelectTrigger className={errors.customer_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select a customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map((customer) => (
                                            <SelectItem key={customer.id} value={customer.id.toString()}>
                                                {customer.name}
                                                {customer.company && ` - ${customer.company}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.customer_id && (
                                    <p className="text-sm text-red-600">{errors.customer_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Opportunity Title *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Website Redesign Project"
                                    className={errors.title ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Describe the opportunity, requirements, or key details..."
                                    className={errors.description ? 'border-red-500' : ''}
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="value">Opportunity Value *</Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.value}
                                        onChange={(e) => handleInputChange('value', e.target.value)}
                                        placeholder="25000.00"
                                        className={errors.value ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.value && (
                                        <p className="text-sm text-red-600">{errors.value}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="probability">Probability (%)</Label>
                                    <Input
                                        id="probability"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.probability}
                                        onChange={(e) => handleInputChange('probability', e.target.value)}
                                        className={errors.probability ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.probability && (
                                        <p className="text-sm text-red-600">{errors.probability}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stage">Stage *</Label>
                                <Select 
                                    value={formData.stage} 
                                    onValueChange={handleStageChange}
                                >
                                    <SelectTrigger className={errors.stage ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lead">Lead</SelectItem>
                                        <SelectItem value="qualified">Qualified</SelectItem>
                                        <SelectItem value="proposal">Proposal</SelectItem>
                                        <SelectItem value="negotiation">Negotiation</SelectItem>
                                        <SelectItem value="closed_won">Closed Won</SelectItem>
                                        <SelectItem value="closed_lost">Closed Lost</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.stage && (
                                    <p className="text-sm text-red-600">{errors.stage}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expected_close_date">Expected Close Date</Label>
                                    <Input
                                        id="expected_close_date"
                                        type="date"
                                        value={formData.expected_close_date}
                                        onChange={(e) => handleInputChange('expected_close_date', e.target.value)}
                                        className={errors.expected_close_date ? 'border-red-500' : ''}
                                    />
                                    {errors.expected_close_date && (
                                        <p className="text-sm text-red-600">{errors.expected_close_date}</p>
                                    )}
                                </div>

                                {(formData.stage === 'closed_won' || formData.stage === 'closed_lost') && (
                                    <div className="space-y-2">
                                        <Label htmlFor="actual_close_date">Actual Close Date</Label>
                                        <Input
                                            id="actual_close_date"
                                            type="date"
                                            value={formData.actual_close_date}
                                            onChange={(e) => handleInputChange('actual_close_date', e.target.value)}
                                            className={errors.actual_close_date ? 'border-red-500' : ''}
                                        />
                                        {errors.actual_close_date && (
                                            <p className="text-sm text-red-600">{errors.actual_close_date}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get(`/opportunities/${opportunity.id}`)}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center space-x-2"
                                >
                                    {processing ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            <span>Updating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>💾</span>
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}