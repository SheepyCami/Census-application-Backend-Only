var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let username = req.session.username || "Guest";
  res.render("index", {
    title: "Census Application",
    username: username,
  });
});

router.get("/test-session", (req, res) => {
  req.session.testValue = "test";
  res.send("Session set");
});

router.get("/check-session", (req, res) => {
  res.json({ testValue: req.session.testValue || "No session value set" });
});

module.exports = router;
