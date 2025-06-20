require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { join } = require('path');
const sqlite3 = require('sqlite3').verbose();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS) : 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) : 100,
});
app.use(limiter);

// Static uploads
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Database connection
const db = new sqlite3.Database(process.env.DB_PATH || './database/bike_taxi.db', (err) => {
  if (err) {
    console.error('Failed to connect to SQLite DB:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database.');
});

// Attach db to req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount authentication routes
app.use('/api/auth', require('./routes/auth.routes'));
// Mount rides routes
app.use('/api/rides', require('./routes/rides.routes'));

// Mount new routes
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/rider', require('./routes/rider.routes'));
app.use('/api/payments', require('./routes/payment.routes'));
app.use('/api/ratings', require('./routes/rating.routes'));
app.use('/api/tracking', require('./routes/tracking.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// TODO: Mount routes here
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/users', require('./routes/user.routes'));
// ...

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bike Taxi Platform API running on port ${PORT}`);
}); 