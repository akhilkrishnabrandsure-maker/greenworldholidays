import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, AlertCircle, LogIn, UserPlus, X } from 'lucide-react';
import { RegisterUserData } from '../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: RegisterUserData) => void;
  onLogin: (loginData: LoginData) => void;
  isLoading: boolean;
  onForgotPassword?: () => void;
}


interface LoginData {
  email: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSubmit, onLogin, isLoading, onForgotPassword }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState<RegisterUserData>({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterUserData & LoginData>>({});
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCountdown(5);
      setCanClose(false);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const validateSignupForm = () => {
    const newErrors: Partial<RegisterUserData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors: Partial<LoginData> = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignupForm()) {
      onSubmit(formData);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm()) {
      onLogin(loginData);
    }
  };

  const handleInputChange = (field: keyof RegisterUserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLoginInputChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        <div className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center">
          {!canClose ? (
            <div className="relative w-10 h-10 flex items-center justify-center bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
              <svg className="w-10 h-10 absolute -rotate-90 transform">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#E5E7EB"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#059669"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray="100.53"
                  strokeDashoffset={100.53 * (1 - countdown / 5)}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <span key={countdown} className="text-sm font-extrabold text-emerald-600 animate-count-pop">
                {countdown}
              </span>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-full shadow-sm transition-all duration-300 transform hover:scale-110 hover:rotate-90 border border-gray-200"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="p-4 sm:p-5 md:p-6">
          {/* Header */}
          <div className="text-center mb-4 px-6 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isLoginMode ? 'Welcome Back' : (
                <>Join <span className="text-emerald-600">Green World Holidays</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {isLoginMode ? 'Login to access your account' : 'Create your account to access exclusive travel services'}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 flex items-center justify-center space-x-2 py-1.5 px-4 rounded-md transition-colors ${!isLoginMode
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-sm font-medium">Sign Up</span>
            </button>
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 flex items-center justify-center space-x-2 py-1.5 px-4 rounded-md transition-colors ${isLoginMode
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <LogIn className="h-4 w-4" />
              <span className="text-sm font-medium">Login</span>
            </button>
          </div>

          {isLoginMode ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => handleLoginInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                {onForgotPassword && (
                  <div className="mt-1 text-right">
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging In...
                  </div>
                ) : (
                  'Login & Continue'
                )}
              </button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-0.5">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    required
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-0.5">{errors.phone}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-0.5">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center animate-pulse-subtle"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account & Continue'
                )}
              </button>
            </form>
          )}

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              By {isLoginMode ? 'logging in' : 'creating an account'}, you agree to our{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 