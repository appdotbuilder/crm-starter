<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSalesOpportunityRequest;
use App\Http\Requests\UpdateSalesOpportunityRequest;
use App\Models\SalesOpportunity;
use App\Models\Customer;
use Inertia\Inertia;

class SalesOpportunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $opportunities = SalesOpportunity::with('customer')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('opportunities/index', [
            'opportunities' => $opportunities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::active()
            ->orderBy('name')
            ->get(['id', 'name', 'company']);

        return Inertia::render('opportunities/create', [
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalesOpportunityRequest $request)
    {
        $opportunity = SalesOpportunity::create($request->validated());

        return redirect()->route('opportunities.show', $opportunity)
            ->with('success', 'Sales opportunity created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SalesOpportunity $opportunity)
    {
        $opportunity->load('customer');

        return Inertia::render('opportunities/show', [
            'opportunity' => $opportunity
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SalesOpportunity $opportunity)
    {
        $customers = Customer::active()
            ->orderBy('name')
            ->get(['id', 'name', 'company']);

        $opportunity->load('customer');

        return Inertia::render('opportunities/edit', [
            'opportunity' => $opportunity,
            'customers' => $customers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalesOpportunityRequest $request, SalesOpportunity $opportunity)
    {
        $opportunity->update($request->validated());

        return redirect()->route('opportunities.show', $opportunity)
            ->with('success', 'Sales opportunity updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalesOpportunity $opportunity)
    {
        $opportunity->delete();

        return redirect()->route('opportunities.index')
            ->with('success', 'Sales opportunity deleted successfully.');
    }
}