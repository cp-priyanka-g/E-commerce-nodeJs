const mysql = require("mysql");
const express = require("express");
const sessions = require("express-session");
const path = require("path");
var connection = require("./database/config.js");
var appRouter = require("./routes/route.js");


const app = express();
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/",appRouter);

app.listen(3000, () => {
  console.log(`Server Started...listening on port 3000`);
});
