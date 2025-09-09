<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenanceSchedule>
 */
class MaintenanceScheduleFactory extends Factory
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
            'title' => fake()->randomElement([
                'Regular Maintenance', 'Software Update', 'Hardware Check',
                'Cleaning Service', 'Calibration', 'Component Replacement'
            ]),
            'description' => fake()->paragraph(),
            'scheduled_date' => fake()->dateTimeBetween('now', '+3 months'),
            'type' => fake()->randomElement(['preventive', 'corrective', 'emergency']),
            'status' => fake()->randomElement(['scheduled', 'in_progress', 'completed']),
            'estimated_cost' => fake()->randomFloat(2, 100000, 2000000),
            'actual_cost' => fake()->optional()->randomFloat(2, 100000, 2000000),
            'notes' => fake()->optional()->paragraph(),
            'assigned_to' => fake()->optional()->randomElement([null, User::factory()]),
        ];
    }

    /**
     * Indicate that the maintenance is scheduled.
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'scheduled',
            'actual_cost' => null,
            'started_at' => null,
            'completed_at' => null,
        ]);
    }

    /**
     * Indicate that the maintenance is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'started_at' => fake()->dateTimeBetween('-1 month', '-1 week'),
            'completed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}