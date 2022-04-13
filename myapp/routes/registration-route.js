var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var db  = require('../database/config.js');


// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form');
});

// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
    inputData ={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_type:"general",
    }
    
    // check unique email address
var sql='SELECT * FROM Users WHERE email =?';
db.query(sql, [inputData.email_address] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputData.email_address+ "was already exist";
 
 }else{
        // save users data into database
    var sql = 'INSERT INTO Users SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
 }
 res.render('registration-form',{alertMsg:msg});
})
 });

 // Admin Registration 
 // to display registration form 
router.get('/admin/register', function(req, res, next) {
    res.render('registration-form');
  });
  
  // to store user input detail on post request
  router.post('/admin/register', function(req, res, next) {
      
      inputData ={
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          user_type:"admin",
      }
      
      // check unique email address
  var sql='SELECT * FROM Users WHERE email =?';
  db.query(sql, [inputData.email_address] ,function (err, data, fields) {
   if(err) throw err
   if(data.length>1){
       var msg = inputData.email_address+ "was already exist";
   
   }else{
          // save users data into database
      var sql = 'INSERT INTO Users SET ?';
     db.query(sql, inputData, function (err, data) {
        if (err) throw err;
             });
    var msg ="Your are successfully registered";

//Send mail
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'priyanka.g@canopas.com',
      pass: 'Priya9428442396'
    }
  });
  
  var mailOptions = {
    from: 'priyanka.g@canopas.com',
    to: inputData.email_address,
    subject: 'Welcome To Our ecommerce Website',
    text: 'Have a great shopping Experience!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });





   }
   res.render('registration-form',{alertMsg:msg});
  })
   });

module.exports = router;

