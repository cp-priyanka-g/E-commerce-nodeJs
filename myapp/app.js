const mysql = require("mysql");
const express = require("express");
const sessions = require("express-session");
const path = require("path");

var appRouter = require("./routes/route.js");
const cors = require('cors');

   

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
app.use("/", appRouter);

app.listen(3000, () => {
  console.log(`Server Started...listening on port 3000`);
});
//SOLUTION 1

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

app.all("/*", function(req, res, next) {
  if (req.method.toLowerCase() !== "options") {
    return next();
  }
  return res.send(204);
});
//SOLUTION 1

// app.all("/api/*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   return next();
// });

// app.all("/api/*", function(req, res, next) {
//   if (req.method.toLowerCase() !== "options") {
//     return next();
//   }
//   return res.send(204);
// });

//SOLUTION 2

// const cors=require("cors");
// app.use(cors({
//    credentials: true, // for authorization
// }));

//SOLUTION 3
// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

//Solution 4
// var cors = require('cors')

// app.use(cors())
//solution 5

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

  app.use(allowCrossDomain);