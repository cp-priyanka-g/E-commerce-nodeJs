var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
var products= require('../controller/all_product.js');
const {response}=require("express");

// router.get("/product-list", function (req, res, next) {
//   res.render("product/product");
// });


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
    res.render('product/product')

  });
});

//product delete
// router.get("/product-delete/:id?",function(req,response,next){
//   products.Delete(req,response);
//   });

// router.get("/product-delete/:id", function (req, res, next) {
//   res.render("product/product");
// });

router.get('/product-delete/:id', (req, res) => {
  db.query('DELETE FROM Product WHERE pid = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
  res.send('Product Record deleted successfully.');
  //console.log("Deleted record");
  else
  console.log(err);
  })
  });


module.exports = router;