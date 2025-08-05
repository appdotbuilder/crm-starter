<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\SalesOpportunity
 *
 * @property int $id
 * @property int $customer_id
 * @property string $title
 * @property string|null $description
 * @property float $value
 * @property string $stage
 * @property int $probability
 * @property \Illuminate\Support\Carbon|null $expected_close_date
 * @property \Illuminate\Support\Carbon|null $actual_close_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Customer $customer
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity query()
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereActualCloseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereExpectedCloseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereProbability($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SalesOpportunity active()
 * @method static \Database\Factories\SalesOpportunityFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SalesOpportunity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'title',
        'description',
        'value',
        'stage',
        'probability',
        'expected_close_date',
        'actual_close_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'value' => 'decimal:2',
        'expected_close_date' => 'date',
        'actual_close_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active opportunities.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->whereNotIn('stage', ['closed_won', 'closed_lost']);
    }

    /**
     * Get the customer that owns the sales opportunity.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the stage label for display.
     */
    public function getStageLabel(): string
    {
        return match($this->stage) {
            'lead' => 'Lead',
            'qualified' => 'Qualified',
            'proposal' => 'Proposal',
            'negotiation' => 'Negotiation',
            'closed_won' => 'Closed Won',
            'closed_lost' => 'Closed Lost',
            default => ucfirst($this->stage),
        };
    }
}