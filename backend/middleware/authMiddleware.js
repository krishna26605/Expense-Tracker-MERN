const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Extract token (Bearer <token>)
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request object

    next(); // Continue to next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
