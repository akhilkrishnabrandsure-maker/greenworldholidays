const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateUser, authenticateAdmin } = require('../middlewares/authMiddleware');
const {
    validateRegistration,
    validateLogin,
    validateProfileUpdate,
    validatePasswordChange,
    validateAdminUserCreation,
    validateAdminUserUpdate,
    handleValidationErrors
} = require('../middlewares/validationMiddleware');

const router = express.Router();
const userController = new UserController();

// Public routes (no authentication required)
router.post('/register', validateRegistration, handleValidationErrors, userController.register.bind(userController));
router.post('/login', validateLogin, handleValidationErrors, userController.login.bind(userController));

// Forgot password routes
router.post('/forgot-password/send-otp', userController.sendOTP.bind(userController));
router.post('/forgot-password/verify-otp', userController.verifyOTP.bind(userController));
router.post('/forgot-password/reset', userController.resetPassword.bind(userController));

// SMS configuration check route (for debugging)
router.get('/sms-config', userController.getSMSConfig.bind(userController));

// User routes (authentication required)
router.get('/profile', authenticateUser, userController.getProfile.bind(userController));
router.put('/profile', authenticateUser, validateProfileUpdate, handleValidationErrors, userController.updateProfile.bind(userController));
router.put('/change-password', authenticateUser, validatePasswordChange, handleValidationErrors, userController.changePassword.bind(userController));

// Admin routes (admin authentication required)
router.get('/admin/users', authenticateAdmin, userController.getAllUsers.bind(userController));
router.get('/admin/users/stats', authenticateAdmin, userController.getUserStats.bind(userController));
router.get('/admin/users/:id', authenticateAdmin, userController.getUserById.bind(userController));
router.post('/admin/users', authenticateAdmin, validateAdminUserCreation, handleValidationErrors, userController.createUser.bind(userController));
router.put('/admin/users/:id', authenticateAdmin, validateAdminUserUpdate, handleValidationErrors, userController.updateUser.bind(userController));
router.delete('/admin/users/:id', authenticateAdmin, userController.deleteUser.bind(userController));
router.patch('/admin/users/:id/toggle-status', authenticateAdmin, userController.toggleUserStatus.bind(userController));

module.exports = router;