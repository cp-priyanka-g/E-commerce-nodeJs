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

//product delete
router.get("/product-delete/:id?",function(req,response,next){
  products.Delete(req,response);
  });

// router.get("/product-delete/:id", function (req, res, next) {
//   res.render("product/product");
// });


// router.post('/product-delete/:id', function(req, res, next) {
//   var product_id= req.params.id;
//  db.query("DELETE fro Product WHERE pid="+product_id,function(err,rows){
//    if(err){
//      req.flash("error",err);
//     //  res.redirect('product/product');
//    }else{
//      req.flash("success","product deleted successfully! pid="+id);
//      console.log("Deleted Successfully")
//     //  res.redirect('product/product');
//    }
//  });
// });




module.exports = router;