const session = require("express-session");
const { Admin } = require("./models");

async function isThisAdmin(req, res, next) {
  try {
    // Check if the user is authenticated via session (Frontend)
    if (req.session && req.session.isAuthenticated) {
      return next();
    }

    // Check if credentials are provided in headers (for Postman testing or other API clients)
    const username = req.headers.username;
    const password = req.headers.password;

    if (!username || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        message:
          "Username and password must be provided in the headers or session must be active.",
      });
    }

    // Verify admin credentials
    const admin = await Admin.findOne({ where: { username } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid admin credentials.",
      });
    }

    // Attach user info to the request object for downstream middleware or route handlers
    req.user = { id: admin.id, username: admin.username };
    req.session.isAuthenticated = true; // Optionally set the session for subsequent requests
    return next();
  } catch (error) {
    console.error("Error verifying admin credentials:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Error verifying admin credentials.",
    });
  }
}

module.exports = isThisAdmin;
