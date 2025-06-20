const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for user
 * @param {Object} payload - Token payload
 * @param {string} type - Token type ('user', 'rider', 'admin')
 * @returns {string} - JWT token
 */
const generateToken = (payload, type = 'user') => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  
  const tokenPayload = {
    ...payload,
    type,
    iat: Math.floor(Date.now() / 1000)
  };
  
  return jwt.sign(tokenPayload, secret, { expiresIn });
};

/**
 * Generate refresh token
 * @param {Object} payload - Token payload
 * @param {string} type - Token type ('user', 'rider', 'admin')
 * @returns {string} - Refresh token
 */
const generateRefreshToken = (payload, type = 'user') => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
  
  const tokenPayload = {
    ...payload,
    type,
    refresh: true,
    iat: Math.floor(Date.now() / 1000)
  };
  
  return jwt.sign(tokenPayload, secret, { expiresIn });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

/**
 * Decode JWT token without verification
 * @param {string} token - JWT token to decode
 * @returns {Object} - Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken
}; 