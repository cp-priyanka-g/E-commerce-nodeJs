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

  // router.get("/product-edit/:id", function (req, res, next) {
  //   res.render("product/edit");
  // });
  
// SHOW EDIT USER FORM
router.get('/product-edit/:id', function(req, res, next){
  db.query('SELECT * FROM Product WHERE pid = ' + req.params.id, function(err, rows, fields) {
  if(err) throw err
  // if user not found
  if (rows.length <= 0) {
  req.flash('error', 'Customers not found with id = ' + req.params.id)
  res.redirect('/product/edit')
  }
  else {

  res.render('product/edit', {
  title: 'Edit Product', 
  pname: rows[0].product_name,
                  
  })
  }            
  })
  })

  //Router to UPDATE a Product detail
router.post('/product-update/:id', (req, res) => {
  let id=req.params.id;
  let product_name=req.body.pname;
  let errors=false;
  if(product_name.length===0){
    errors=true;
    req.flash("error","Please enter Product name");
    response.render("product/edit",{
      id:req.params.id,
      product_name:pname
    });
  }
  if(!errors){
    var form_data={
      id:id,
      product_name:product_name,
    };
    db.query("UPDATE Product SET ? where pid="+id ,form_data,function(err,row){
      if(err){
        console.log("error in update")
      }else{
        console.log("updated successfully")
      }
    })
  }

  });


module.exports = router;