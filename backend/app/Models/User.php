<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;
    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        // 'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles() {
        return $this->hasMany(Role::class);
    }

    public function bhwDesignations () {
        return $this->hasMany(BhwDesignation::class);
    }

    public function midwifeDesignations () {
        return $this->hasMany(MidwifeDesignation::class);
    }

    public function rhuDesignation()
    {
        return $this->hasOne(RhuDesignation::class, 'user_id', 'id');
    }

    public function getMidwifeBarangaysAttribute() {
        $barangays = MidwifeDesignation::where('user_id', $this->id)->with(['barangay'])->get()->map(function ($midwifeDesignation) {
            return $midwifeDesignation->barangay;
        });
        return $barangays;
    }

    public function captainDesignations() {
        return $this->hasMany(CaptainDesignation::class);   
    }

    public function personalInformation()
    {
        return $this->hasOne(PersonalInformation::class);
    }
}
