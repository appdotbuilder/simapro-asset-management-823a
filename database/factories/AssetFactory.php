<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'asset_code' => 'AST-' . date('Y') . '-' . strtoupper(fake()->bothify('???###')),
            'name' => fake()->randomElement([
                'Laptop Dell Inspiron', 'Projector Epson', 'Office Chair', 'Desktop Computer',
                'Printer Canon', 'Whiteboard', 'Conference Table', 'Air Conditioner',
                'Camera DSLR', 'Scanner', 'Microphone', 'Smart TV', 'Coffee Machine',
                'Refrigerator', 'Vacuum Cleaner', 'Power Drill', 'Microscope'
            ]),
            'photos' => null,
            'category_id' => Category::factory(),
            'brand' => fake()->randomElement(['Dell', 'HP', 'Canon', 'Epson', 'Sony', 'Samsung', 'LG', 'Panasonic']),
            'serial_number' => fake()->bothify('???###???###'),
            'specifications' => fake()->paragraph(3),
            'location_id' => Location::factory(),
            'supplier_id' => Supplier::factory(),
            'purchase_date' => fake()->dateTimeBetween('-3 years', '-1 month'),
            'purchase_price' => fake()->randomFloat(2, 500000, 50000000),
            'status' => fake()->randomElement(['available', 'available', 'available', 'borrowed', 'maintenance']),
            'qr_code' => fake()->uuid(),
        ];
    }

    /**
     * Indicate that the asset is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }

    /**
     * Indicate that the asset is borrowed.
     */
    public function borrowed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'borrowed',
        ]);
    }

    /**
     * Indicate that the asset is under maintenance.
     */
    public function maintenance(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'maintenance',
        ]);
    }
}