<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\BorrowingRequest
 *
 * @property int $id
 * @property string $request_code
 * @property int $asset_id
 * @property int|null $user_id
 * @property string $borrower_name
 * @property string $borrower_email
 * @property string|null $borrower_id_number
 * @property \Illuminate\Support\Carbon $borrow_date
 * @property \Illuminate\Support\Carbon $return_date
 * @property string $purpose
 * @property string $status
 * @property string|null $notes
 * @property int|null $processed_by
 * @property \Illuminate\Support\Carbon|null $processed_at
 * @property \Illuminate\Support\Carbon|null $actual_borrow_date
 * @property \Illuminate\Support\Carbon|null $actual_return_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Asset $asset
 * @property-read \App\Models\User|null $user
 * @property-read \App\Models\User|null $processor
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DamageReport> $damageReports
 * @property-read int|null $damage_reports_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest active()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereActualBorrowDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereActualReturnDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereAssetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereBorrowDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereBorrowerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereBorrowerIdNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereBorrowerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereProcessedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereProcessedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereRequestCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereReturnDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereUserId($value)
 * @method static \Database\Factories\BorrowingRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BorrowingRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'request_code',
        'asset_id',
        'user_id',
        'borrower_name',
        'borrower_email',
        'borrower_id_number',
        'borrow_date',
        'return_date',
        'purpose',
        'status',
        'notes',
        'processed_by',
        'processed_at',
        'actual_borrow_date',
        'actual_return_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'borrow_date' => 'datetime',
        'return_date' => 'datetime',
        'processed_at' => 'datetime',
        'actual_borrow_date' => 'datetime',
        'actual_return_date' => 'datetime',
    ];

    /**
     * Scope a query to only include pending requests.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include active borrowings.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'borrowed');
    }

    /**
     * Get the asset that is being borrowed.
     */
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the user who made the request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user who processed the request.
     */
    public function processor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Get the damage reports for this borrowing request.
     */
    public function damageReports(): HasMany
    {
        return $this->hasMany(DamageReport::class);
    }
}