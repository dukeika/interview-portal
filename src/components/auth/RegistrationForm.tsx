// src/components/auth/RegistrationForm.tsx
"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { userService } from '@/services/userService';
import { companyService } from '@/services/companyService';
import { UserRole } from '@/API';

export interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'candidate' | 'company';
  // Company-specific fields
  companyName?: string;
  companyWebsite?: string;
  companyPhone?: string;
  companyAddress?: string;
}

export interface RegistrationFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onError,
  className
}) => {
  const [step, setStep] = useState<'register' | 'confirm'>('register');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'candidate',
    companyName: '',
    companyWebsite: '',
    companyPhone: '',
    companyAddress: ''
  });
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Phone validation (optional but format check if provided)
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Company-specific validation
    if (formData.userType === 'company') {
      if (!formData.companyName?.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (formData.companyWebsite && !/^https?:\/\/.+/.test(formData.companyWebsite)) {
        newErrors.companyWebsite = 'Please enter a valid website URL (including http:// or https://)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Step 1: Create Cognito user
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.firstName,
            family_name: formData.lastName,
            phone_number: formData.phone || undefined
          }
        }
      });

      // Move to confirmation step
      setStep('confirm');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.message || 'Registration failed. Please try again.';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmationCode.trim()) {
      onError?.('Please enter the confirmation code');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Confirm Cognito user
      const result = await confirmSignUp({
        username: formData.email,
        confirmationCode: confirmationCode.trim()
      });

      // Step 2: Create user record in our database
      await userService.createUser({
        sub: '', // This will be set after first login
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined,
        role: formData.userType === 'company' ? UserRole.COMPANY_ADMIN : UserRole.CANDIDATE,
        isActive: true
      });

      // Step 3: If company registration, create company record
      if (formData.userType === 'company' && formData.companyName) {
        await companyService.createCompany({
          name: formData.companyName,
          email: formData.email, // Use admin email as company email
          phone: formData.companyPhone,
          address: formData.companyAddress,
          website: formData.companyWebsite,
          description: '',
          isActive: true
        });
      }

      onSuccess?.();
    } catch (error: any) {
      console.error('Confirmation error:', error);
      const errorMessage = error.message || 'Confirmation failed. Please try again.';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRegistrationForm = () => (
    <form onSubmit={handleRegister} className="space-y-6">
      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I want to register as:
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('userType', 'candidate')}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              formData.userType === 'candidate'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <User className="w-8 h-8 mx-auto mb-2" />
            <div className="font-medium">Job Seeker</div>
            <div className="text-xs text-gray-500">Looking for opportunities</div>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('userType', 'company')}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              formData.userType === 'company'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Building2 className="w-8 h-8 mx-auto mb-2" />
            <div className="font-medium">Employer</div>
            <div className="text-xs text-gray-500">Hiring candidates</div>
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            required
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Company Information (only for company users) */}
      {formData.userType === 'company' && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                errors.companyName ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            {errors.companyName && (
              <p className="text-sm text-red-600 mt-1">{errors.companyName}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Website
            </label>
            <input
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              placeholder="https://company.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                errors.companyWebsite ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.companyWebsite && (
              <p className="text-sm text-red-600 mt-1">{errors.companyWebsite}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Phone
              </label>
              <input
                type="tel"
                value={formData.companyPhone}
                onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Address
              </label>
              <input
                type="text"
                value={formData.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );

  const renderConfirmationForm = () => (
    <form onSubmit={handleConfirm} className="space-y-6">
      <div className="text-center">
        <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Check Your Email
        </h3>
        <p className="text-gray-600 mb-4">
          We've sent a confirmation code to <strong>{formData.email}</strong>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmation Code
        </label>
        <input
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono text-gray-900"
          required
          maxLength={6}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Confirming...' : 'Confirm Account'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setStep('register')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to registration
        </button>
      </div>
    </form>
  );

  return (
    <div className={className}>
      <div className="bg-white">
        {step === 'register' ? renderRegistrationForm() : renderConfirmationForm()}
      </div>
    </div>
  );
};

export default RegistrationForm;