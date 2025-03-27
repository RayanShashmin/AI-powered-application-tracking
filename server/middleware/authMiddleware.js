const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Extract token from cookie
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;