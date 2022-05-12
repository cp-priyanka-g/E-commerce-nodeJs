const db = require("../database/config");
const bcrypt = require("bcryptjs");

function Login(req, res) {
  var emailAddress = req.body.email_address;
  var password = req.body.password;
  const hash = "$2a$10$7b83OUYU2khhruoTX.GzCuX0Z3J7PT96/yMHFnFxCiGq.PPLSqnYi";

  bcrypt.compare(password, hash, function(err, isMatch) {
    if (err) {
      throw err
    } else if (!isMatch) {
      console.log("Password doesn't match!")
    } else {
      console.log("Password matches!")
    }
  })

  var sql = "SELECT * FROM Users WHERE email=? AND password =?";

  db.query(sql, [emailAddress, password], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      req.session.loggedinUser = true;
      req.session.emailAddress = emailAddress;
      req.session.role = data[0].user_type;
      req.session.userid = data[0].id;
      
       user_type = data[0].user_type;
      if (user_type == "general") res.redirect("/dashboard");
      else res.redirect("/admindashboard");
    } else {
      res.render("login-form", {
        alertMsg: "Your Email Address or password is wrong",
      });
    }
  });
}

module.exports = { Login };
