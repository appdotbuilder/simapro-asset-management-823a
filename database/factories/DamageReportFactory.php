<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\BorrowingRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DamageReport>
 */
class DamageReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'asset_id' => Asset::factory(),
            'reported_by' => User::factory(),
            'borrowing_request_id' => fake()->optional()->randomElement([null, BorrowingRequest::factory()]),
            'description' => fake()->paragraph(),
            'photos' => null,
            'severity' => fake()->randomElement(['minor', 'moderate', 'major']),
            'status' => fake()->randomElement(['reported', 'under_repair', 'repaired']),
            'repair_cost' => fake()->optional()->randomFloat(2, 100000, 5000000),
            'repair_notes' => fake()->optional()->paragraph(),
            'repaired_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the damage is minor.
     */
    public function minor(): static
    {
        return $this->state(fn (array $attributes) => [
            'severity' => 'minor',
            'repair_cost' => fake()->randomFloat(2, 50000, 500000),
        ]);
    }

    /**
     * Indicate that the damage is major.
     */
    public function major(): static
    {
        return $this->state(fn (array $attributes) => [
            'severity' => 'major',
            'repair_cost' => fake()->randomFloat(2, 1000000, 10000000),
        ]);
    }
}