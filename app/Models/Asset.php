<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Asset
 *
 * @property int $id
 * @property string $asset_code
 * @property string $name
 * @property array|null $photos
 * @property int $category_id
 * @property string|null $brand
 * @property string|null $serial_number
 * @property string|null $specifications
 * @property int $location_id
 * @property int|null $supplier_id
 * @property string|null $purchase_date
 * @property string|null $purchase_price
 * @property string $status
 * @property string|null $qr_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\Location $location
 * @property-read \App\Models\Supplier|null $supplier
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BorrowingRequest> $borrowingRequests
 * @property-read int|null $borrowing_requests_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DamageReport> $damageReports
 * @property-read int|null $damage_reports_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MaintenanceSchedule> $maintenanceSchedules
 * @property-read int|null $maintenance_schedules_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Asset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset query()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset available()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereAssetCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereLocationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset wherePhotos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereQrCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereSerialNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereSpecifications($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereSupplierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereUpdatedAt($value)
 * @method static \Database\Factories\AssetFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Asset extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_code',
        'name',
        'photos',
        'category_id',
        'brand',
        'serial_number',
        'specifications',
        'location_id',
        'supplier_id',
        'purchase_date',
        'purchase_price',
        'status',
        'qr_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'photos' => 'array',
        'purchase_date' => 'date',
        'purchase_price' => 'decimal:2',
    ];

    /**
     * Scope a query to only include available assets.
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Get the category that owns the asset.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the location that owns the asset.
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    /**
     * Get the supplier that owns the asset.
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get the borrowing requests for the asset.
     */
    public function borrowingRequests(): HasMany
    {
        return $this->hasMany(BorrowingRequest::class);
    }

    /**
     * Get the damage reports for the asset.
     */
    public function damageReports(): HasMany
    {
        return $this->hasMany(DamageReport::class);
    }

    /**
     * Get the maintenance schedules for the asset.
     */
    public function maintenanceSchedules(): HasMany
    {
        return $this->hasMany(MaintenanceSchedule::class);
    }
}