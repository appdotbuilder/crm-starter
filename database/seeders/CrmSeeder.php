<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\SalesOpportunity;
use Illuminate\Database\Seeder;

class CrmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create customers with varying numbers of opportunities
        Customer::factory(20)->active()->create()->each(function ($customer) {
            // Each customer gets 1-4 opportunities
            SalesOpportunity::factory(random_int(1, 4))->create([
                'customer_id' => $customer->id,
            ]);
        });

        // Create some inactive customers
        Customer::factory(5)->inactive()->create();

        // Create some standalone opportunities for variety
        SalesOpportunity::factory(10)->create();
    }
}