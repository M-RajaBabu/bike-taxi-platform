const { verifyToken } = require('../utils/jwt');

/**
 * Middleware to verify JWT token
 * @param {string} type - Token type to verify ('user', 'rider', 'admin')
 * @returns {Function} - Express middleware function
 */
const authenticateToken = (type = 'user') => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    try {
      const decoded = verifyToken(token);
      
      // Check if token type matches
      if (decoded.type !== type) {
        return res.status(403).json({ error: 'Invalid token type for this endpoint' });
      }

      // Add user info to request
      req.user = {
        id: decoded.id,
        phone: decoded.phone,
        email: decoded.email,
        name: decoded.name,
        type: decoded.type
      };
      
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
};

/**
 * Middleware to verify user token
 */
const authenticateUser = authenticateToken('user');

/**
 * Middleware to verify rider token
 */
const authenticateRider = authenticateToken('rider');

/**
 * Middleware to verify admin token
 */
const authenticateAdmin = authenticateToken('admin');

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = {
        id: decoded.id,
        phone: decoded.phone,
        email: decoded.email,
        name: decoded.name,
        type: decoded.type
      };
    } catch (error) {
      // Token is invalid, but we don't fail the request
      console.log('Invalid token in optional auth:', error.message);
    }
  }
  
  next();
};

module.exports = {
  authenticateToken,
  authenticateUser,
  authenticateRider,
  authenticateAdmin,
  optionalAuth
}; 