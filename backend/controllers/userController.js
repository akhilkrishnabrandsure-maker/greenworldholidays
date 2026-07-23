const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sendOTPEmail } = require('../services/emailService');
const AdminNotification = require('../models/AdminNotification'); // <-- Add this

class UserController {
    // Generate JWT Token
    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
    }

    // Register new user

    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { name, email, phone, password } = req.body;
    
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
    
            // Create new user
            const user = new User({
                name,
                email,
                phone,
                password
            });
    
            await user.save();
    
            // Create admin notification
            const message = `New user signed up: Name: ${name}, Email: ${email}, Phone: ${phone}`;
            const adminNotif = new AdminNotification({ message });
            await adminNotif.save();
            
            // Emit WebSocket event for admin notification
            try {
                const webSocketService = require('../services/websocketService').getWebSocketService();
                webSocketService.broadcastToAdmins('USER_SIGNUP', {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    timestamp: new Date()
                });
                console.log('Emitted USER_SIGNUP event for new user:', user.email);
            } catch (error) {
                console.error('Error emitting USER_SIGNUP event:', error);
            }
    
            // Generate token
            const token = this.generateToken(user._id);
    
            res.status(201).json({
                message: 'User registered successfully',
                user: user.toJSON(),
                token
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
    
    // Login user
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user with password
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if user is active
            if (!user.isActive) {
                return res.status(401).json({ message: 'Account is deactivated' });
            }

            // Check password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Update last login
            user.lastLogin = new Date();
            await user.save();

            // Emit WebSocket event for admin notification
            try {
                const webSocketService = require('../services/websocketService').getWebSocketService();
                webSocketService.broadcastToAdmins('USER_LOGIN', {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    timestamp: new Date()
                });
                console.log('Emitted USER_LOGIN event for user:', user.email);
            } catch (error) {
                console.error('Error emitting USER_LOGIN event:', error);
            }

            // Generate token
            const token = this.generateToken(user._id);

            // Emit WebSocket event for admin notification
            try {
                const webSocketService = require('../services/websocketService').getWebSocketService();
                webSocketService.broadcastToAdmins('USER_LOGIN', {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    timestamp: new Date()
                });
                console.log('Emitted USER_LOGIN event for user:', user.email);
            } catch (error) {
                console.error('Error emitting USER_LOGIN event:', error);
            }

            res.status(200).json({
                message: 'Login successful',
                user: user.toJSON(),
                token
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get current user profile
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                user: user.toJSON()
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Update user profile
    async updateProfile(req, res) {
        try {
            const { name, phone } = req.body;
            const updateData = {};

            if (name) updateData.name = name;
            if (phone) updateData.phone = phone;

            const user = await User.findByIdAndUpdate(
                req.userId,
                updateData,
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'Profile updated successfully',
                user: user.toJSON()
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Change password
    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;

            const user = await User.findById(req.userId).select('+password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify current password
            const isCurrentPasswordValid = await user.comparePassword(currentPassword);
            if (!isCurrentPasswordValid) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Update password
            user.password = newPassword;
            await user.save();

            res.status(200).json({
                message: 'Password changed successfully'
            });
        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // ADMIN ROUTES

    // Get all users (admin only)
    async getAllUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const users = await User.find({})
                .select('-password')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await User.countDocuments({});

            res.status(200).json({
                users,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalUsers: total,
                    usersPerPage: limit
                }
            });
        } catch (error) {
            console.error('Get all users error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get user by ID (admin only)
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Get user by ID error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Create user (admin only)
    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, phone, password, role } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Create new user
            const user = new User({
                name,
                email,
                phone,
                password,
                role: role || 'user'
            });

            await user.save();

            res.status(201).json({
                message: 'User created successfully',
                user: user.toJSON()
            });
        } catch (error) {
            console.error('Create user error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Update user (admin only)
    async updateUser(req, res) {
        try {
            const { name, email, phone, role, isActive } = req.body;
            const updateData = {};

            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (phone) updateData.phone = phone;
            if (role) updateData.role = role;
            if (typeof isActive === 'boolean') updateData.isActive = isActive;

            const user = await User.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'User updated successfully',
                user
            });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Delete user (admin only)
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                message: 'User deleted successfully'
            });
        } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Toggle user status (admin only)
    async toggleUserStatus(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.isActive = !user.isActive;
            await user.save();

            res.status(200).json({
                message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
                user: user.toJSON()
            });
        } catch (error) {
            console.error('Toggle user status error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get user statistics (admin only)
    async getUserStats(req, res) {
        try {
            const totalUsers = await User.countDocuments({});
            const activeUsers = await User.countDocuments({ isActive: true });
            const adminUsers = await User.countDocuments({ role: 'admin' });
            const regularUsers = await User.countDocuments({ role: 'user' });

            // Get users created in last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const newUsers = await User.countDocuments({
                createdAt: { $gte: thirtyDaysAgo }
            });

            res.status(200).json({
                stats: {
                    totalUsers,
                    activeUsers,
                    inactiveUsers: totalUsers - activeUsers,
                    adminUsers,
                    regularUsers,
                    newUsersLast30Days: newUsers
                }
            });
        } catch (error) {
            console.error('Get user stats error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // FORGOT PASSWORD METHODS

    // Generate OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Send OTP via email
    async sendOTP(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this email' });
            }

            // Generate OTP
            const otp = this.generateOTP();
            user.resetPasswordOTP = otp;
            user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
            await user.save();

            // Send OTP via email
            await sendOTPEmail(email, otp);

            res.status(200).json({
                message: 'OTP sent to your email'
            });
        } catch (error) {
            console.error('Send OTP error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Verify OTP
    async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(400).json({ message: 'Email and OTP are required' });
            }

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this email' });
            }

            // Check if OTP exists and is not expired
            if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
                return res.status(400).json({ message: 'No OTP request found' });
            }

            if (new Date() > user.resetPasswordExpires) {
                return res.status(400).json({ message: 'OTP has expired' });
            }

            // Verify OTP
            if (user.resetPasswordOTP !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            res.status(200).json({
                message: 'OTP verified successfully'
            });
        } catch (error) {
            console.error('Verify OTP error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Reset password
    async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;

            if (!email || !otp || !newPassword) {
                return res.status(400).json({ message: 'Email, OTP, and new password are required' });
            }

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this email' });
            }

            // Check if OTP exists and is not expired
            if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
                return res.status(400).json({ message: 'No OTP request found' });
            }

            if (new Date() > user.resetPasswordExpires) {
                return res.status(400).json({ message: 'OTP has expired' });
            }

            // Verify OTP
            if (user.resetPasswordOTP !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            // Update password
            user.password = newPassword;
            user.resetPasswordOTP = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(200).json({
                message: 'Password reset successfully'
            });
        } catch (error) {
            console.error('Reset password error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get SMS configuration status (for debugging)
    async getSMSConfig(req, res) {
        try {
            // This method is no longer relevant as SMS is removed.
            // Keeping it for now, but it will always return a message.
            res.status(200).json({
                message: 'SMS service is currently disabled. Forgot password uses email.'
            });
        } catch (error) {
            console.error('Get SMS config error:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = UserController;