<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    //
    protected $guarded = [];

    const STATUS_PENDING = "pending";
    const STATUS_APPROVED = "approved";
    const STATUS_REJECTED = "rejected";

    public function reportLogs()
    {
        return $this->hasMany(ReportLog::class);
    }

    public function reportType()
    {
        return $this->belongsTo(ReportType::class);
    }

    public function submittor()
    {
        return $this->belongsTo(User::class, 'submitted_by', 'id');
    }
}
