const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");
var connection = require("./database/config.js");

var registrationRouter = require("./routes/registration-route.js");
var loginRouter = require("./routes/login-route.js");
var dashboardRouter = require("./routes/dashboard-route.js");
var admindashboardRouter = require("./routes/admindashboard-route.js");
var logoutRouter = require("./routes/logout-route.js");
var productRouter = require("./routes/product-route.js");
var categoryRouter = require("./routes/category-route.js");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", registrationRouter);
app.use("/", loginRouter);
app.use("/", dashboardRouter);
app.use("/", admindashboardRouter);
app.use("/", logoutRouter);
app.use("/", productRouter);
app.use("/", categoryRouter);



app.listen(3000, () => {
  console.log(`Server Started...listening on port 3000`);
});
