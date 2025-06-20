-- Bike Taxi Platform Database Schema
-- SQLite Database

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255),
    profile_picture VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Riders table (Captains)
CREATE TABLE IF NOT EXISTS riders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255),
    profile_picture VARCHAR(255),
    vehicle_number VARCHAR(20) NOT NULL,
    vehicle_model VARCHAR(100),
    vehicle_color VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_online BOOLEAN DEFAULT FALSE,
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    rating DECIMAL(3, 2) DEFAULT 0.0,
    total_rides INTEGER DEFAULT 0,
    total_earnings DECIMAL(10, 2) DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rider_id INTEGER NOT NULL,
    document_type VARCHAR(20) NOT NULL CHECK (document_type IN ('license', 'rc', 'insurance', 'aadhar', 'pan')),
    document_number VARCHAR(50) NOT NULL,
    document_url VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by INTEGER,
    verified_at DATETIME,
    expires_at DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES riders(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- Emergency contacts for users
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    relationship VARCHAR(50),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Locations table (saved and recent)
CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('home', 'work', 'saved', 'recent')),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Ride requests table
CREATE TABLE IF NOT EXISTS ride_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    pickup_latitude DECIMAL(10, 8) NOT NULL,
    pickup_longitude DECIMAL(11, 8) NOT NULL,
    pickup_address TEXT NOT NULL,
    drop_latitude DECIMAL(10, 8) NOT NULL,
    drop_longitude DECIMAL(11, 8) NOT NULL,
    drop_address TEXT NOT NULL,
    estimated_distance DECIMAL(8, 2),
    estimated_duration INTEGER, -- in minutes
    estimated_fare DECIMAL(8, 2),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'started', 'completed', 'cancelled')),
    rider_id INTEGER,
    actual_distance DECIMAL(8, 2),
    actual_duration INTEGER,
    actual_fare DECIMAL(8, 2),
    surge_multiplier DECIMAL(3, 2) DEFAULT 1.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rider_id) REFERENCES riders(id)
);

-- Rides table (actual ride details)
CREATE TABLE IF NOT EXISTS rides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ride_request_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rider_id INTEGER NOT NULL,
    pickup_latitude DECIMAL(10, 8) NOT NULL,
    pickup_longitude DECIMAL(11, 8) NOT NULL,
    pickup_address TEXT NOT NULL,
    drop_latitude DECIMAL(10, 8) NOT NULL,
    drop_longitude DECIMAL(11, 8) NOT NULL,
    drop_address TEXT NOT NULL,
    distance DECIMAL(8, 2),
    duration INTEGER, -- in minutes
    base_fare DECIMAL(8, 2),
    distance_fare DECIMAL(8, 2),
    time_fare DECIMAL(8, 2),
    surge_fare DECIMAL(8, 2),
    total_fare DECIMAL(8, 2),
    status VARCHAR(20) DEFAULT 'started' CHECK (status IN ('started', 'completed', 'cancelled')),
    started_at DATETIME,
    completed_at DATETIME,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_request_id) REFERENCES ride_requests(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rider_id) REFERENCES riders(id)
);

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('card', 'upi', 'wallet', 'cash')),
    payment_details TEXT, -- JSON string for card/upi details
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ride_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rider_id INTEGER NOT NULL,
    amount DECIMAL(8, 2) NOT NULL,
    payment_method_id INTEGER,
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('card', 'upi', 'wallet', 'cash')),
    transaction_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    gateway_response TEXT, -- JSON string for payment gateway response
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rides(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rider_id) REFERENCES riders(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ride_id INTEGER NOT NULL,
    rated_by VARCHAR(10) NOT NULL CHECK (rated_by IN ('user', 'rider')),
    rated_user_id INTEGER NOT NULL,
    rated_rider_id INTEGER,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rides(id),
    FOREIGN KEY (rated_user_id) REFERENCES users(id),
    FOREIGN KEY (rated_rider_id) REFERENCES riders(id)
);

-- Fare structure table
CREATE TABLE IF NOT EXISTS fare_structure (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    base_fare DECIMAL(8, 2) NOT NULL,
    per_km_rate DECIMAL(8, 2) NOT NULL,
    per_minute_rate DECIMAL(8, 2) NOT NULL,
    minimum_fare DECIMAL(8, 2) NOT NULL,
    cancellation_fee DECIMAL(8, 2) DEFAULT 0.0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rider earnings table
CREATE TABLE IF NOT EXISTS rider_earnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rider_id INTEGER NOT NULL,
    ride_id INTEGER NOT NULL,
    base_amount DECIMAL(8, 2) NOT NULL,
    commission_percentage DECIMAL(5, 2) DEFAULT 20.0,
    commission_amount DECIMAL(8, 2) NOT NULL,
    net_amount DECIMAL(8, 2) NOT NULL,
    incentive_amount DECIMAL(8, 2) DEFAULT 0.0,
    total_amount DECIMAL(8, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rider_id) REFERENCES riders(id),
    FOREIGN KEY (ride_id) REFERENCES rides(id)
);

-- Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(8, 2) NOT NULL,
    minimum_amount DECIMAL(8, 2) DEFAULT 0.0,
    maximum_discount DECIMAL(8, 2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from DATETIME NOT NULL,
    valid_until DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Promo code usage table
CREATE TABLE IF NOT EXISTS promo_code_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    promo_code_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    ride_id INTEGER NOT NULL,
    discount_amount DECIMAL(8, 2) NOT NULL,
    used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ride_id) REFERENCES rides(id)
);

-- SOS contacts table
CREATE TABLE IF NOT EXISTS sos_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    relationship VARCHAR(50),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SOS alerts table
CREATE TABLE IF NOT EXISTS sos_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    ride_id INTEGER,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
    resolved_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ride_id) REFERENCES rides(id)
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin', 'support')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_riders_phone ON riders(phone);
CREATE INDEX IF NOT EXISTS idx_riders_location ON riders(current_latitude, current_longitude);
CREATE INDEX IF NOT EXISTS idx_ride_requests_status ON ride_requests(status);
CREATE INDEX IF NOT EXISTS idx_ride_requests_user ON ride_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_requests_rider ON ride_requests(rider_id);
CREATE INDEX IF NOT EXISTS idx_rides_status ON rides(status);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_ratings_ride ON ratings(ride_id);
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_valid ON promo_codes(valid_from, valid_until); 