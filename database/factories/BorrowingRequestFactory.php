<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BorrowingRequest>
 */
class BorrowingRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $borrowDate = fake()->dateTimeBetween('-1 month', '+1 month');
        $returnDate = fake()->dateTimeBetween($borrowDate, '+2 months');

        return [
            'request_code' => 'BR-' . date('Ymd') . '-' . strtoupper(fake()->bothify('??????')),
            'asset_id' => Asset::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'borrower_name' => fake()->name(),
            'borrower_email' => fake()->safeEmail(),
            'borrower_id_number' => fake()->optional()->numerify('EMP####'),
            'borrow_date' => $borrowDate,
            'return_date' => $returnDate,
            'purpose' => fake()->paragraph(),
            'status' => fake()->randomElement(['pending', 'approved', 'borrowed', 'returned']),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'processed_by' => null,
            'processed_at' => null,
        ]);
    }

    /**
     * Indicate that the request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'processed_by' => User::factory(),
            'processed_at' => now(),
        ]);
    }
}