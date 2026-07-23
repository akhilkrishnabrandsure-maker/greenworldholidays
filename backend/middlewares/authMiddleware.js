const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to authenticate any logged-in user
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        req.userId = user._id;
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to authenticate admin users only
const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-auth-token'];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admin privileges required' });
        }

        req.userId = user._id;
        req.user = user;
        next();
    } catch (error) {
        console.error('Admin authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Optional authentication - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-auth-token'];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');

            if (user && user.isActive) {
                req.userId = user._id;
                req.user = user;
            }
        }
        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

module.exports = {
    authenticateUser,
    authenticateAdmin,
    optionalAuth
};