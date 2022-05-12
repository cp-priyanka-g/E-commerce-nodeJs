const db = require("../database/config");

function Auth(req, res, next) {
  if (!req.session.emailAddress || !req.session.loggedinUser || !req.session) {
    const err = new Error("Please login first");
    err.statuscode = 401;
    next(err);
  }
  next();
}

function isAdmin(req, res, next) {
  var emailAddress = req.session.emailAddress;
var sql = "SELECT * FROM Users WHERE email=?";
console.log("USER email",emailAddress );

  db.query(sql, [emailAddress], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
       req.session.role = data[0].user_type;
  
      if (req.session.role== "admin") {
        next();
      }
      else{
        err.statuscode = 401;
        next(err);
      }
}
  });
  }
module.exports = { Auth, isAdmin};
