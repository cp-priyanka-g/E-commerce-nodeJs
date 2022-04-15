var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');

router.get('/product-list', function(req, res, next) {
    var sql='SELECT * FROM Product';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('product/product', { userData: data});
  });
});


//rest api to create a new record into mysql database

router.get("/product-add", function (req, res, next) {
  res.render("product/create");
});


router.post('/product-add', function(req, res, next) {
  var product_name= req.body.pname;
 
   sql = `INSERT INTO Product (product_name) VALUES ("${product_name}")`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    var msg = "Product inserted Successfully";
  
    res.redirect('/product/product',{ alertMsg: msg });
  });
});




module.exports = router;