<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MaintenanceSchedule
 *
 * @property int $id
 * @property int $asset_id
 * @property string $title
 * @property string|null $description
 * @property string $scheduled_date
 * @property string $type
 * @property string $status
 * @property string|null $estimated_cost
 * @property string|null $actual_cost
 * @property string|null $notes
 * @property int|null $assigned_to
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Asset $asset
 * @property-read \App\Models\User|null $technician
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereActualCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereAssignedTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereEstimatedCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereScheduledDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceSchedule whereUpdatedAt($value)
 * @method static \Database\Factories\MaintenanceScheduleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MaintenanceSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'asset_id',
        'title',
        'description',
        'scheduled_date',
        'type',
        'status',
        'estimated_cost',
        'actual_cost',
        'notes',
        'assigned_to',
        'started_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_date' => 'date',
        'estimated_cost' => 'decimal:2',
        'actual_cost' => 'decimal:2',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the asset for this maintenance schedule.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the technician assigned to this maintenance.
     */
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}