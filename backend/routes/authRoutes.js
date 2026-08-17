const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById
} = require("../services/authService");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const user = await registerUser(username, password);

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Registration failed"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const result = await loginUser(username, password);

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Login failed"
    });
  }
});

router.get("/me", authenticateToken, (req, res) => {
  try {
    const user = getUserById(req.user.userId);

    res.json({ user });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Unable to get current user"
    });
  }
});

module.exports = router;