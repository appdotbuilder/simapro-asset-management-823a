<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Main Warehouse', 'Floor 1 Storage', 'Floor 2 Storage', 'Floor 3 Storage',
                'IT Room', 'Meeting Room A', 'Meeting Room B', 'Conference Hall',
                'Laboratory', 'Workshop', 'Security Office', 'Reception Area'
            ]),
            'description' => fake()->sentence(),
        ];
    }
}