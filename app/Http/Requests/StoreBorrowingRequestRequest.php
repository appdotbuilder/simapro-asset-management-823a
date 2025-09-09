<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBorrowingRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'asset_id' => 'required|exists:assets,id',
            'borrower_name' => 'required|string|max:255',
            'borrower_email' => 'required|email|max:255',
            'borrower_id_number' => 'nullable|string|max:50',
            'borrow_date' => 'required|date|after_or_equal:today',
            'return_date' => 'required|date|after:borrow_date',
            'purpose' => 'required|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'asset_id.required' => 'Please select an asset to borrow.',
            'asset_id.exists' => 'The selected asset is not valid.',
            'borrower_name.required' => 'Borrower name is required.',
            'borrower_email.required' => 'Email address is required.',
            'borrower_email.email' => 'Please provide a valid email address.',
            'borrow_date.required' => 'Borrow date is required.',
            'borrow_date.after_or_equal' => 'Borrow date cannot be in the past.',
            'return_date.required' => 'Return date is required.',
            'return_date.after' => 'Return date must be after borrow date.',
            'purpose.required' => 'Purpose of borrowing is required.',
        ];
    }
}