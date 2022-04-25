const db = require("../database/config");

function Auth(req, res,next) {
    
     if(!req.session || !req.session.loggedinUser) 
     {
      const err=new Error ("Please login first")
      err.statuscode=401;
      next(err);
     }
      next();    
    } 
module.exports = { Auth };
