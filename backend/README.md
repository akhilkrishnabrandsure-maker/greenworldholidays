# Green World Holidays Backend API

A fully functional Node.js/Express backend for user management with admin functionality.

## Features

- **User Management**: Register, login, profile management
- **Admin Panel**: Complete admin functionality for user management
- **Security**: JWT authentication, password hashing, input validation
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Comprehensive input validation using express-validator
- **Security**: Rate limiting, CORS, helmet security headers

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/greenworld_holidays

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Public Routes (No Authentication Required)

#### Register User
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "Password123"
}
```

#### Login User
```
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### User Routes (Authentication Required)

#### Get Profile
```
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "phone": "9876543210"
}
```

#### Change Password
```
PUT /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

### Admin Routes (Admin Authentication Required)

#### Get All Users
```
GET /api/users/admin/users?page=1&limit=10
Authorization: Bearer <admin_token>
```

#### Get User Statistics
```
GET /api/users/admin/users/stats
Authorization: Bearer <admin_token>
```

#### Get User by ID
```
GET /api/users/admin/users/:id
Authorization: Bearer <admin_token>
```

#### Create User (Admin)
```
POST /api/users/admin/users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "1234567890",
  "password": "Password123",
  "role": "user"
}
```

#### Update User (Admin)
```
PUT /api/users/admin/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "9876543210",
  "role": "admin",
  "isActive": true
}
```

#### Delete User (Admin)
```
DELETE /api/users/admin/users/:id
Authorization: Bearer <admin_token>
```

#### Toggle User Status (Admin)
```
PATCH /api/users/admin/users/:id/toggle-status
Authorization: Bearer <admin_token>
```

## User Model

```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  phone: String (required, 10 digits),
  password: String (required, min 6 chars, hashed),
  role: String (enum: 'user', 'admin', default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Validation Rules

### Registration/Login
- **Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format
- **Phone**: Exactly 10 digits
- **Password**: Minimum 6 characters, must contain uppercase, lowercase, and number

### Admin Operations
- All user validations apply
- Role must be 'user' or 'admin'
- isActive must be boolean

## Security Features

- **Password Hashing**: bcryptjs with salt rounds of 12
- **JWT Authentication**: 30-day token expiration
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable CORS with credentials
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Comprehensive error handling and logging

## Creating Admin User

To create the first admin user, you can either:

1. **Use the API** (if you have an existing admin):
   ```bash
   curl -X POST http://localhost:5000/api/users/admin/users \
     -H "Authorization: Bearer <admin_token>" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@example.com",
       "phone": "1234567890",
       "password": "AdminPass123",
       "role": "admin"
     }'
   ```

2. **Direct Database Insert** (for first admin):
   ```javascript
   // In MongoDB shell or MongoDB Compass
   db.users.insertOne({
     name: "Admin User",
     email: "admin@example.com",
     phone: "1234567890",
     password: "$2a$12$hashedpasswordhere", // Use bcrypt to hash
     role: "admin",
     isActive: true,
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    }
  ]
}
```

## Health Check

```
GET /health
```

Returns server status and uptime information.

## Development

- **Hot Reload**: Use `npm run dev` for development with nodemon
- **Logging**: All errors are logged to console
- **Environment**: Set NODE_ENV=development for detailed error messages

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas or production MongoDB
4. Set proper CORS origins
5. Use environment variables for all sensitive data