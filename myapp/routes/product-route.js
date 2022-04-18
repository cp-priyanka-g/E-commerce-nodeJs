var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
var products= require('../controller/all_product.js');
const {response}=require("express");


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


router.get('/product-delete/:id', (req, res) => {
  db.query('DELETE FROM Product WHERE pid = ?', [req.params.id], (err, rows, fields) => {
  if (!err){
    res.send('Product Record deleted successfully.');
    console.log("Deleted record");
    
  }
  else
  console.log(err);
  })
  });

  
// SHOW EDIT USER FORM
router.get('/product-edit/:id', function(req, res, next) {
  var productId= req.params.id;
  var sql=`SELECT * FROM Product WHERE pid=${productId}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
   
    res.render('product/edit', {editData: data[0]});
  });
});

  //Router to UPDATE a Product detail

router.post('/product-edit/:id', function(req, res, next) {
var id= req.params.id;
var updateData=req.body;
var sql = `UPDATE Product SET ? WHERE pid= ?`;
db.query(sql, [updateData, id], function (err, data) {
if (err) throw err;
console.log(data.affectedRows + " record(s) updated");
});
//res.redirect('product/product');
res.send('Product updated successfully.');
});

module.exports = router;