import jwt from 'jsonwebtoken';

const JWT_SECRET = 'lumixor-studio-secret-key-2024'; // In production, use environment variable

// Verify JWT Token
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        msg: "Access denied. No token provided.", 
        code: 401 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    res.status(401).json({ 
      msg: "Invalid token", 
      code: 401, 
      data: error.message 
    });
  }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      msg: "Access denied. Admin only.", 
      code: 403 
    });
  }
  next();
};

// Check if user is authenticated (user or admin)
export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      msg: "Not authenticated", 
      code: 401 
    });
  }
  next();
};

export { JWT_SECRET };
