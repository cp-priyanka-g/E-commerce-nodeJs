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
  res.render("/product/create");
});

router.post('/product-add', function (req, res) {
    
  var product_name = req.body.product_name;
  connection.query('INSERT INTO Product SET ?', product_name, function (err,rows) {
   if (err) {
     req.flash("error".err);
     res.render('/product/create');
   }else{
     res.flash("sucess","Product successfully added");
     res.redirect('/product/product');
   }
         
 });
});


//rest api to delete record from mysql database
// router.delete('/product-delete', function (req, res) {
//     console.log(req.body);
//     connection.query('DELETE FROM `Product` WHERE `pid`=?', [req.body.id], function (error, results, fields) {
//        if (error) throw error;
//        res.end('Product has been deleted!');
//      });
//  });


module.exports = router;