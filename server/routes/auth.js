const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Login endpoint
router.post("/", async (req, res) => {
    try {
        console.log("Login request received:", req.body); // Debug log

        // Validate request body
        const { error } = validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message); // Debug log
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found:", req.body.email); // Debug log
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log("Invalid password for user:", user.email); // Debug log
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        // Generate token
        const token = user.generateAuthToken();
        console.log("Token generated:", token); // Debug log

        // Set token in a cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure cookie is only sent over HTTPS in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });

        console.log("Cookie set successfully"); // Debug log

        // Send success response with user data
        res.status(200).send({ 
            message: "Logged in successfully",
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.log("Login error:", error); // Debug log
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Logout endpoint
router.post("/logout", (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).send({ message: "Logged out successfully" });
});

// Check authentication endpoint
router.get("/check", async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }
        res.status(200).send({ user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(400).send({ message: "Invalid token" });
    }
});

// Validation function
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;