const db = require("../database/config");
const { encrypt, decrypt } = require("../crypto");

function Login(req, res) {
  var emailAddress = req.body.email_address;
  var password = req.body.password;
  var sql = "SELECT * FROM Users WHERE email=? AND password =?";

  db.query(sql, [emailAddress, password], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      req.session.loggedinUser = true;
      req.session.emailAddress = emailAddress;
      req.session.role = data[0].user_type;
      req.session.userid = data[0].id;
      
      console.log("USERID",req.session.userid );
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
