const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateRegistration = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('phone')
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be exactly 10 digits'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Validation rules for user login
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Validation rules for profile update
const validateProfileUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    
    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be exactly 10 digits')
];

// Validation rules for password change
const validatePasswordChange = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Validation rules for admin user creation
const validateAdminUserCreation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('phone')
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be exactly 10 digits'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
    body('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be either "user" or "admin"')
];

// Validation rules for admin user update
const validateAdminUserUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be exactly 10 digits'),
    
    body('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be either "user" or "admin"'),
    
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean value')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg,
                value: error.value
            }))
        });
    }
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateProfileUpdate,
    validatePasswordChange,
    validateAdminUserCreation,
    validateAdminUserUpdate,
    handleValidationErrors
}; 