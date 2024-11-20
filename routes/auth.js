const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // To compare hashed passwords

// Render login page
router.get("/login", (req, res) => {
  const messages = req.session.messages || [];
  // Pass the username from the session or default to "Guest"
  const username = req.session.username || "Guest";
  res.render("login", { messages: messages, username: username });
  req.session.messages = null; // Clear error messages after rendering
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body; // Access 'login' instead of 'username'

  try {
    const admin = await db.Admin.findOne({ where: { username: login } }); // Match 'username' in the database with 'login'

    if (!admin) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No user found with that username.",
      });
    }

    const isValid = await admin.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Incorrect password.",
      });
    }

    req.session.isAuthenticated = true;
    req.session.username = admin.username;

    res.json({ message: "Login successful", username: admin.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
