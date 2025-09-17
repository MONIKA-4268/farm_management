const jwt = require('jsonwebtoken');

// JWT Authentication middleware
function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your .env secret
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = auth;