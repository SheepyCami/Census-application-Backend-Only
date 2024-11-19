//this routes are for admin login and logout

var express = require("express");
var router = express.Router();
var fs = require("fs").promises;
var path = require("path");

var isThisAdmin = require("../isThisAdmin");

// Login page check if admin is already logged in
router.get("/login", function (req, res, next) {});

//adding login page?
//only Admin can login?
//
module.exports = router;
