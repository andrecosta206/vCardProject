<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VcardResource extends JsonResource
{
    public static $format = 'default';
    public function toArray($request)
    {
        switch (VcardResource::$format) {
            case 'detailed':   
                return [
                    'phone_number' => $this->phone_number,
                    'name' => $this->name,
                    'email' => $this->email,
                    'photo' => $this->photo_url,
                    'password' => $this->password,
                    'confirmation_code' => $this->confirmation_code,
                    'custom_data' => $this->custom_data,
                    'blocked' => $this->blocked,
                    'balance' => $this->balance,
                    'max_debit' => $this->max_debit,
                    
                ];
            default:
                return [
                    // simple format
                    'phone' => $this->phone_number,
                    'name' => $this->name,
                    'photo' => $this->photo_url,
                    'balance' => $this->balance,
                ];
        }
    }
}
