import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Shield, CheckCircle, X } from 'lucide-react';
import { apiService } from '../services/api';

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
  onSubmit?: (email: string) => void;
}

type Step = 'email' | 'otp' | 'newPassword' | 'success';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose, onBackToLogin }) => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOTP = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await apiService.sendOTPEmail(email);
      setSuccess('OTP sent successfully to your email');
      setCurrentStep('otp');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await apiService.verifyOTPEmail(email, otp);
      setSuccess('OTP verified successfully');
      setCurrentStep('newPassword');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetNewPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await apiService.resetPasswordEmail(email, otp, newPassword);
      setSuccess('Password reset successfully');
      setCurrentStep('success');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');

    try {
      await apiService.sendOTPEmail(email);
      setSuccess('OTP resent successfully');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep('email');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Forgot Password</h2>
              <p className="text-sm text-gray-600">
                {currentStep === 'email' && 'Enter your email address'}
                {currentStep === 'otp' && 'Enter the OTP sent to your email'}
                {currentStep === 'newPassword' && 'Set your new password'}
                {currentStep === 'success' && 'Password reset successful'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center p-4 bg-gray-50">
          <div className="flex space-x-2">
            {['email', 'otp', 'newPassword', 'success'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step 
                    ? 'bg-emerald-600 text-white' 
                    : index < ['email', 'otp', 'newPassword', 'success'].indexOf(currentStep)
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    index < ['email', 'otp', 'newPassword', 'success'].indexOf(currentStep)
                      ? 'bg-emerald-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Step 1: Email */}
          {currentStep === 'email' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Resend
                </button>
              </div>
            </div>
          )}

          {/* Step 3: New Password */}
          {currentStep === 'newPassword' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleSetNewPassword}
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isLoading ? 'Setting Password...' : 'Set New Password'}
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 'success' && (
            <div className="text-center space-y-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Password Reset Successful!</h3>
              <p className="text-gray-600">
                Your password has been reset successfully. You can now login with your new password.
              </p>
              <button
                onClick={onBackToLogin}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep !== 'success' && (
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={currentStep === 'email' ? onBackToLogin : () => setCurrentStep('email')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>
                {currentStep === 'email' ? 'Back to Login' : 'Back to Email'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 