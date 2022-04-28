var express = require("express");
var nodemailer = require("nodemailer");
var router = express.Router();
var db = require("../database/config.js");
const { encrypt, decrypt } = require("../crypto");

function Register(req, res) {
  inputData = {
    name: req.body.name,
    email: req.body.email,
    password: encrypt(req.body.password),
    user_type: "general",
  };

  // check unique email address
  var sql = "SELECT * FROM Users WHERE email =?";
  db.query(sql, [inputData.email_address], function (err, data, fields) {
    if (err) throw err;

    if (data.length > 0) {
      req.session.loggedinUser = true;
      req.session.email = data[0].email;
      var msg = inputData.email_address + "was already exist";

      return;
    } else {
      // save users data into database
      var sql = "INSERT INTO Users SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });

      // SEND MAIL
      var msg = "Your are successfully registered";
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "",
          pass: "smart@123",
        },
      });

      var mailOptions = {
        from: "smarttraveller57@gmail.com",
        to: inputData.email,
        subject: "Sending Email using Nodejs",
        text: "That was easy!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    req.session.emailAddress = inputData.email;
    req.session.loggedinUser = true;
    res.render("./dashboard", { email: req.session.emailAddress });
  });
}

//admin register

function AdminRegister(req, res) {
  inputData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    user_type: "admin",
  };

  // check unique email address
  var sql = "SELECT * FROM Users WHERE email =?";
  db.query(sql, [inputData.email_address], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 1) {
      req.session.loggedinUser = true;
      req.session.emailAddress = inputData.email;
      var msg = inputData.email_address + "was already exist";
    } else {
      // save users data into database
      var sql = "INSERT INTO Users SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });
      var msg = "Your are successfully registered";
    }

    res.render("./admindashboard", { email: req.session.emailAddress });
  });
}

module.exports = { Register, AdminRegister };
