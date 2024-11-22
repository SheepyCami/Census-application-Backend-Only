require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth"); // Import auth routes
var participantsRouter = require("./routes/participants");

const db = require("./models");

var app = express();

// Sync database
db.sequelize
  .sync({ force: false })
  .then(() => console.log("Database connected and synchronized"))
  .catch((err) => console.error("Error syncing database:", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use(
  express.static(path.join(__dirname, "node_modules/popper.js/dist/umd"))
);

const session = require("express-session");

// Session middlewaren
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: false },
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000, //1 hour
    },
  })
);

// Register routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter); // Register /auth routes
app.use("/participants", participantsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
