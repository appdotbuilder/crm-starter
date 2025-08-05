<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\SalesOpportunity;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the CRM dashboard.
     */
    public function index()
    {
        $totalCustomers = Customer::count();
        $activeCustomers = Customer::active()->count();
        
        $totalOpportunities = SalesOpportunity::count();
        $activeOpportunities = SalesOpportunity::active()->count();
        $totalOpportunityValue = SalesOpportunity::active()->sum('value');
        
        $wonDeals = SalesOpportunity::where('stage', 'closed_won')->count();
        $wonDealsValue = SalesOpportunity::where('stage', 'closed_won')->sum('value');
        
        $recentCustomers = Customer::latest()
            ->take(5)
            ->get(['id', 'name', 'company', 'email', 'created_at']);
            
        $recentOpportunities = SalesOpportunity::with('customer:id,name,company')
            ->latest()
            ->take(5)
            ->get();
            
        $opportunitiesByStage = SalesOpportunity::selectRaw('stage, count(*) as count, sum(value) as total_value')
            ->whereNotIn('stage', ['closed_won', 'closed_lost'])
            ->groupBy('stage')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCustomers' => $totalCustomers,
                'activeCustomers' => $activeCustomers,
                'totalOpportunities' => $totalOpportunities,
                'activeOpportunities' => $activeOpportunities,
                'totalOpportunityValue' => $totalOpportunityValue,
                'wonDeals' => $wonDeals,
                'wonDealsValue' => $wonDealsValue,
            ],
            'recentCustomers' => $recentCustomers,
            'recentOpportunities' => $recentOpportunities,
            'opportunitiesByStage' => $opportunitiesByStage,
        ]);
    }
}