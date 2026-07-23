require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./config/db');
const { initWebSocket } = require('./services/websocketService');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize WebSocket service
const webSocketService = initWebSocket(server);

// Log the server port
console.log(`Server starting on port ${PORT}`);
console.log(`WebSocket server will be available on ws://localhost:${PORT}`);

// Security middleware
app.use(helmet());

// CORS setup
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'http://localhost:5173',
        'https://greenworldholidays.co.in',
        'https://greenworldholiday.netlify.app',
        'https://greenworldholidays.in'
    ],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect DB
connectDB();

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); 

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error:', error);

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(error.errors).map(err => err.message)
        });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if (error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate field value entered' });
    }

    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Start server with retry if port is busy
function startServer(port = process.env.PORT || 5000, maxRetries = 20) {
    // Ensure port is a number and within valid range
    port = Number(port);
    if (isNaN(port) || port <= 0 || port > 65535) {
        port = 5002; // Default port if invalid
    }

    server.listen(port, () => {
        console.log(`✅ Server running on port ${port}`);
        console.log(`✅ WebSocket server running on port ${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            if (maxRetries > 0) {
                // Use a port in the ephemeral range (49152-65535) if we've tried many times
                const nextPort = port >= 5002 && port < 6000 ? port + 1 : 
                               Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152;
                
                console.log(`⚠️ Port ${port} is busy, trying port ${nextPort}...`);
                setTimeout(() => {
                    server.close();
                    startServer(nextPort, maxRetries - 1);
                }, 1000);
            } else {
                console.error('❌ Could not find an available port after multiple attempts');
                process.exit(1);
            }
        } else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
    
    return server;
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
