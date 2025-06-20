const crypto = require('crypto');

/**
 * Generate a random OTP of specified length
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} - Generated OTP
 */
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

/**
 * Generate OTP hash for verification
 * @param {string} otp - OTP to hash
 * @param {string} phone - Phone number
 * @param {number} timestamp - Timestamp when OTP was generated
 * @returns {string} - Hashed OTP
 */
const generateOTPHash = (otp, phone, timestamp) => {
  const data = `${otp}${phone}${timestamp}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * Verify OTP hash
 * @param {string} otp - OTP to verify
 * @param {string} phone - Phone number
 * @param {number} timestamp - Timestamp when OTP was generated
 * @param {string} hash - Stored hash to compare
 * @returns {boolean} - True if OTP is valid
 */
const verifyOTPHash = (otp, phone, timestamp, hash) => {
  const expectedHash = generateOTPHash(otp, phone, timestamp);
  return expectedHash === hash;
};

/**
 * Check if OTP is expired
 * @param {number} timestamp - Timestamp when OTP was generated
 * @param {number} expiryMinutes - OTP expiry time in minutes (default: 5)
 * @returns {boolean} - True if OTP is expired
 */
const isOTPExpired = (timestamp, expiryMinutes = 5) => {
  const now = Date.now();
  const expiryTime = timestamp + (expiryMinutes * 60 * 1000);
  return now > expiryTime;
};

module.exports = {
  generateOTP,
  generateOTPHash,
  verifyOTPHash,
  isOTPExpired
}; 