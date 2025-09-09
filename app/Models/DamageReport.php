<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\DamageReport
 *
 * @property int $id
 * @property int $asset_id
 * @property int $reported_by
 * @property int|null $borrowing_request_id
 * @property string $description
 * @property array|null $photos
 * @property string $severity
 * @property string $status
 * @property string|null $repair_cost
 * @property string|null $repair_notes
 * @property \Illuminate\Support\Carbon|null $repaired_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Asset $asset
 * @property-read \App\Models\User $reporter
 * @property-read \App\Models\BorrowingRequest|null $borrowingRequest
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereBorrowingRequestId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport wherePhotos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereRepairedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereRepairCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereRepairNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereReportedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereSeverity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DamageReport whereUpdatedAt($value)
 * @method static \Database\Factories\DamageReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DamageReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_id',
        'reported_by',
        'borrowing_request_id',
        'description',
        'photos',
        'severity',
        'status',
        'repair_cost',
        'repair_notes',
        'repaired_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'photos' => 'array',
        'repair_cost' => 'decimal:2',
        'repaired_at' => 'datetime',
    ];

    /**
     * Get the asset that was damaged.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the user who reported the damage.
     */
    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    /**
     * Get the borrowing request associated with this damage.
     */
    public function borrowingRequest(): BelongsTo
    {
        return $this->belongsTo(BorrowingRequest::class);
    }
}