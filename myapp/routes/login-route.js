var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login-form');
});

router.post('/login', function(req, res){
    var emailAddress = req.body.email_address;
    var password = req.body.password;
    var sql='SELECT * FROM Users WHERE email=? AND password =?';

    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            user_type=  data[0].user_type;
            if(user_type == "general")
            res.redirect('/dashboard');
            else 
            res.redirect('/admindashboard');
        }else{
            res.render('login-form',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
module.exports = router;