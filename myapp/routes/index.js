var express = require('express');
var router = express.Router();
var db  = require('./database/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// to display registration form 
router.get('/register', function(req, res, next) {
  res.render('registration-form');
});

// to store user input detail on post request
router.post('/register', function(req, res, next) {
    
    inputData ={
        first_name: req.body.first_name,
        email_address: req.body.email_address,
        password: req.body.password,
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

module.exports = router;

