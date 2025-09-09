<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\BorrowingRequest;
use App\Models\Category;
use App\Models\Location;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SimaproSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@simapro.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'employee_id' => 'ADM001',
            'is_active' => true,
        ]);

        // Create staff user
        $staff = User::create([
            'name' => 'Staff Sarpras',
            'email' => 'staff@simapro.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'employee_id' => 'STF001',
            'is_active' => true,
        ]);

        // Create regular user
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'user@simapro.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'employee_id' => 'USR001',
            'is_active' => true,
        ]);

        // Create categories
        $categories = [
            ['name' => 'Electronics', 'description' => 'Electronic devices and components'],
            ['name' => 'Office Equipment', 'description' => 'Office furniture and equipment'],
            ['name' => 'IT Hardware', 'description' => 'Computers and IT related equipment'],
            ['name' => 'Audio Visual', 'description' => 'Projectors, cameras, and AV equipment'],
            ['name' => 'Tools', 'description' => 'Various tools and instruments'],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create locations
        $locations = [
            ['name' => 'Main Warehouse', 'description' => 'Central storage facility'],
            ['name' => 'Floor 1 Office', 'description' => 'First floor office area'],
            ['name' => 'Floor 2 Office', 'description' => 'Second floor office area'],
            ['name' => 'Meeting Room A', 'description' => 'Conference room A'],
            ['name' => 'IT Room', 'description' => 'Information Technology room'],
        ];

        foreach ($locations as $locationData) {
            Location::create($locationData);
        }

        // Create suppliers
        Supplier::factory(10)->create();

        // Create assets - more available than borrowed
        Asset::factory(25)->available()->create();
        Asset::factory(5)->borrowed()->create();
        Asset::factory(3)->maintenance()->create();

        // Create some borrowing requests
        BorrowingRequest::factory(8)->pending()->create();
        BorrowingRequest::factory(5)->approved()->create();

        // Create additional users
        User::factory(10)->create(['role' => 'user']);
        User::factory(3)->create(['role' => 'staff']);
    }
}