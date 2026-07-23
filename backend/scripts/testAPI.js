const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/users';

// Test data
const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    phone: '1234567890',
    password: 'TestPass123'
};

const adminUser = {
    name: 'Admin User',
    email: 'admin@greenworld.com',
    phone: '1234567890',
    password: 'AdminPass123'
};

let userToken = '';
let adminToken = '';

const testAPI = async () => {
    console.log('🧪 Testing Green World Holidays API...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        const healthResponse = await axios.get('http://localhost:5000/health');
        console.log('✅ Health check passed:', healthResponse.data.message);

        // Test 2: Register User
        console.log('\n2. Testing User Registration...');
        const registerResponse = await axios.post(`${BASE_URL}/register`, testUser);
        console.log('✅ User registered successfully');
        userToken = registerResponse.data.token;

        // Test 3: Login User
        console.log('\n3. Testing User Login...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ User login successful');
        userToken = loginResponse.data.token;

        // Test 4: Get User Profile
        console.log('\n4. Testing Get Profile...');
        const profileResponse = await axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('✅ Profile retrieved:', profileResponse.data.user.name);

        // Test 5: Update Profile
        console.log('\n5. Testing Update Profile...');
        const updateResponse = await axios.put(`${BASE_URL}/profile`, {
            name: 'Updated Test User',
            phone: '9876543210'
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('✅ Profile updated successfully');

        // Test 6: Admin Login
        console.log('\n6. Testing Admin Login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/login`, {
            email: adminUser.email,
            password: adminUser.password
        });
        console.log('✅ Admin login successful');
        adminToken = adminLoginResponse.data.token;

        // Test 7: Get All Users (Admin)
        console.log('\n7. Testing Get All Users (Admin)...');
        const usersResponse = await axios.get(`${BASE_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Users retrieved:', usersResponse.data.users.length, 'users');

        // Test 8: Get User Statistics (Admin)
        console.log('\n8. Testing Get User Statistics (Admin)...');
        const statsResponse = await axios.get(`${BASE_URL}/admin/users/stats`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Statistics retrieved:', statsResponse.data.stats);

        // Test 9: Create User (Admin)
        console.log('\n9. Testing Create User (Admin)...');
        const newUser = {
            name: 'New User',
            email: `newuser${Date.now()}@example.com`,
            phone: '5555555555',
            password: 'NewPass123',
            role: 'user'
        };
        const createUserResponse = await axios.post(`${BASE_URL}/admin/users`, newUser, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ User created by admin successfully');

        // Test 10: Toggle User Status (Admin)
        console.log('\n10. Testing Toggle User Status (Admin)...');
        const toggleResponse = await axios.patch(`${BASE_URL}/admin/users/${createUserResponse.data.user._id}/toggle-status`, {}, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ User status toggled successfully');

        console.log('\n🎉 All tests passed successfully!');
        console.log('\n📋 Test Summary:');
        console.log('- Health check: ✅');
        console.log('- User registration: ✅');
        console.log('- User login: ✅');
        console.log('- Profile management: ✅');
        console.log('- Admin authentication: ✅');
        console.log('- Admin user management: ✅');
        console.log('- User statistics: ✅');
        console.log('- User creation by admin: ✅');
        console.log('- User status management: ✅');

    } catch (error) {
        console.error('\n❌ Test failed:', error.response?.data || error.message);
        console.log('\n💡 Make sure:');
        console.log('1. Server is running on http://localhost:5000');
        console.log('2. MongoDB is connected');
        console.log('3. Admin user exists (run: node scripts/createAdmin.js)');
    }
};

// Run tests
testAPI(); 