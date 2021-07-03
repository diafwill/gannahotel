const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.enable("trust proxy");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

app.options("*", cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 2) ROUTES
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `L'adresse ${req.originalUrl} est introuvable sur ce serveur !`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
