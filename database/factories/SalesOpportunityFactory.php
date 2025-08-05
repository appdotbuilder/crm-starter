<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesOpportunity>
 */
class SalesOpportunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stage = $this->faker->randomElement(['lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost']);
        
        $probability = match($stage) {
            'lead' => random_int(10, 25),
            'qualified' => random_int(25, 50),
            'proposal' => random_int(50, 75),
            'negotiation' => random_int(75, 90),
            'closed_won' => 100,
            'closed_lost' => 0,
            default => 50,
        };

        return [
            'customer_id' => Customer::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->optional()->paragraph(),
            'value' => $this->faker->randomFloat(2, 1000, 100000),
            'stage' => $stage,
            'probability' => $probability,
            'expected_close_date' => $this->faker->dateTimeBetween('now', '+6 months'),
            'actual_close_date' => in_array($stage, ['closed_won', 'closed_lost']) 
                ? $this->faker->dateTimeBetween('-3 months', 'now') 
                : null,
        ];
    }

    /**
     * Indicate that the opportunity is a lead.
     */
    public function lead(): static
    {
        return $this->state(fn (array $attributes) => [
            'stage' => 'lead',
            'probability' => random_int(10, 25),
            'actual_close_date' => null,
        ]);
    }

    /**
     * Indicate that the opportunity is won.
     */
    public function won(): static
    {
        return $this->state(fn (array $attributes) => [
            'stage' => 'closed_won',
            'probability' => 100,
            'actual_close_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    /**
     * Indicate that the opportunity is lost.
     */
    public function lost(): static
    {
        return $this->state(fn (array $attributes) => [
            'stage' => 'closed_lost',
            'probability' => 0,
            'actual_close_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ]);
    }
}