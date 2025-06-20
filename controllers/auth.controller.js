const bcrypt = require('bcryptjs');
const { generateOTP, generateOTPHash, verifyOTPHash, isOTPExpired } = require('../utils/otp');
const { generateToken, generateRefreshToken } = require('../utils/jwt');

// In-memory OTP storage (in production, use Redis)
const otpStore = new Map();

/**
 * Generate and send OTP for user registration
 */
const generateUserOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Check if user already exists
    const existingUser = await new Promise((resolve, reject) => {
      req.db.get('SELECT id FROM users WHERE phone = ?', [phone], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this phone number' });
    }

    // Generate OTP
    const otp = generateOTP(6);
    const timestamp = Date.now();
    const hash = generateOTPHash(otp, phone, timestamp);

    // Store OTP hash
    otpStore.set(phone, { hash, timestamp });

    // TODO: Send OTP via SMS/Email
    console.log(`OTP for ${phone}: ${otp}`);

    res.json({
      message: 'OTP sent successfully',
      phone,
      expires_in: 300 // 5 minutes
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

/**
 * Generate and send OTP for rider registration
 */
const generateRiderOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Check if rider already exists
    const existingRider = await new Promise((resolve, reject) => {
      req.db.get('SELECT id FROM riders WHERE phone = ?', [phone], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingRider) {
      return res.status(409).json({ error: 'Rider already exists with this phone number' });
    }

    // Generate OTP
    const otp = generateOTP(6);
    const timestamp = Date.now();
    const hash = generateOTPHash(otp, phone, timestamp);

    // Store OTP hash
    otpStore.set(`rider_${phone}`, { hash, timestamp });

    // TODO: Send OTP via SMS/Email
    console.log(`Rider OTP for ${phone}: ${otp}`);

    res.json({
      message: 'OTP sent successfully',
      phone,
      expires_in: 300 // 5 minutes
    });
  } catch (error) {
    console.error('Error generating rider OTP:', error);
    res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

/**
 * Verify OTP and register user
 */
const verifyUserOTP = async (req, res) => {
  try {
    const { phone, otp, name, email } = req.body;

    // Get stored OTP data
    const otpData = otpStore.get(phone);
    if (!otpData) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    // Verify OTP
    if (!verifyOTPHash(otp, phone, otpData.timestamp, otpData.hash)) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired
    if (isOTPExpired(otpData.timestamp, 5)) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Create user
    const result = await new Promise((resolve, reject) => {
      req.db.run(
        'INSERT INTO users (phone, name, email, is_verified) VALUES (?, ?, ?, ?)',
        [phone, name, email, true],
        function(err) {
          if (err) reject(err);
          else resolve(this);
        }
      );
    });

    // Generate tokens
    const tokenPayload = {
      id: result.lastID,
      phone,
      name,
      email
    };

    const accessToken = generateToken(tokenPayload, 'user');
    const refreshToken = generateRefreshToken(tokenPayload, 'user');

    // Clear OTP
    otpStore.delete(phone);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: result.lastID,
        phone,
        name,
        email,
        is_verified: true
      },
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    console.error('Error verifying user OTP:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

/**
 * Verify OTP and register rider
 */
const verifyRiderOTP = async (req, res) => {
  try {
    const { phone, otp, name, email, vehicle_number, vehicle_model, vehicle_color } = req.body;

    // Get stored OTP data
    const otpData = otpStore.get(`rider_${phone}`);
    if (!otpData) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    // Verify OTP
    if (!verifyOTPHash(otp, phone, otpData.timestamp, otpData.hash)) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired
    if (isOTPExpired(otpData.timestamp, 5)) {
      otpStore.delete(`rider_${phone}`);
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Create rider
    const result = await new Promise((resolve, reject) => {
      req.db.run(
        'INSERT INTO riders (phone, name, email, vehicle_number, vehicle_model, vehicle_color, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [phone, name, email, vehicle_number, vehicle_model, vehicle_color, false],
        function(err) {
          if (err) reject(err);
          else resolve(this);
        }
      );
    });

    // Generate tokens
    const tokenPayload = {
      id: result.lastID,
      phone,
      name,
      email
    };

    const accessToken = generateToken(tokenPayload, 'rider');
    const refreshToken = generateRefreshToken(tokenPayload, 'rider');

    // Clear OTP
    otpStore.delete(`rider_${phone}`);

    res.status(201).json({
      message: 'Rider registered successfully',
      rider: {
        id: result.lastID,
        phone,
        name,
        email,
        vehicle_number,
        vehicle_model,
        vehicle_color,
        is_verified: false
      },
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    console.error('Error verifying rider OTP:', error);
    res.status(500).json({ error: 'Failed to register rider' });
  }
};

/**
 * User login
 */
const userLogin = async (req, res) => {
  try {
    const { phone } = req.body;

    // Find user
    const user = await new Promise((resolve, reject) => {
      req.db.get('SELECT * FROM users WHERE phone = ? AND is_active = 1', [phone], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate tokens
    const tokenPayload = {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email
    };

    const accessToken = generateToken(tokenPayload, 'user');
    const refreshToken = generateRefreshToken(tokenPayload, 'user');

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified
      },
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Rider login
 */
const riderLogin = async (req, res) => {
  try {
    const { phone } = req.body;

    // Find rider
    const rider = await new Promise((resolve, reject) => {
      req.db.get('SELECT * FROM riders WHERE phone = ? AND is_active = 1', [phone], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!rider) {
      return res.status(404).json({ error: 'Rider not found' });
    }

    // Generate tokens
    const tokenPayload = {
      id: rider.id,
      phone: rider.phone,
      name: rider.name,
      email: rider.email
    };

    const accessToken = generateToken(tokenPayload, 'rider');
    const refreshToken = generateRefreshToken(tokenPayload, 'rider');

    res.json({
      message: 'Login successful',
      rider: {
        id: rider.id,
        phone: rider.phone,
        name: rider.name,
        email: rider.email,
        vehicle_number: rider.vehicle_number,
        vehicle_model: rider.vehicle_model,
        vehicle_color: rider.vehicle_color,
        is_verified: rider.is_verified,
        is_online: rider.is_online
      },
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (error) {
    console.error('Error in rider login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Refresh token
 */
const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = require('../utils/jwt').verifyToken(refresh_token);
    
    if (!decoded.refresh) {
      return res.status(400).json({ error: 'Invalid refresh token' });
    }

    // Generate new tokens
    const tokenPayload = {
      id: decoded.id,
      phone: decoded.phone,
      name: decoded.name,
      email: decoded.email
    };

    const accessToken = generateToken(tokenPayload, decoded.type);
    const newRefreshToken = generateRefreshToken(tokenPayload, decoded.type);

    res.json({
      access_token: accessToken,
      refresh_token: newRefreshToken
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

module.exports = {
  generateUserOTP,
  generateRiderOTP,
  verifyUserOTP,
  verifyRiderOTP,
  userLogin,
  riderLogin,
  refreshToken
}; 