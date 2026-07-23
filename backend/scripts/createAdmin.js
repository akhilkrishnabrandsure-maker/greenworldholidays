const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.email);
            process.exit(0);
        }

        // Create admin user
        const adminData = {
            name: 'Admin User',
            email: 'admin@greenworld.com',
            phone: '1234567890',
            password: 'AdminPass123',
            role: 'admin',
            isActive: true
        };

        const admin = new User(adminData);
        await admin.save();

        console.log('Admin user created successfully!');
        console.log('Email:', adminData.email);
        console.log('Password:', adminData.password);
        console.log('Role:', adminData.role);
        console.log('\nPlease change the password after first login.');

    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

// Run the script
createAdminUser(); 