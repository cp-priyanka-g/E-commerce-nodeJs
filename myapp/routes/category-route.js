var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
var category= require('../controller/all_categories.js');
const {response}=require("express");

router.get("/category-list",function(req,response,next){
    category.Category(req,response);
    });
  
router.get("/category-show",function(req,response,next){
      category.Categoryshow(req,response);
      });

 router.get("/category-add", function (req, res, next) {
        res.render("category/create");
      });
      
  
  router.post("/category-add", function (req, res, next) {
    category.Create(req,res);
  });
  
  router.get("/category-delete/:id", function (req, res, next) {
    category.Delete(req,res);
  });
  
  router.get("/category-edit/:id", function (req, res, next) {
    category.Edit(req,res);
  });
  
  router.post("/category-edit/:id", function (req, res, next) {
    category.Update(req,res);
  });
  

// router.get('/category-list', function(req, res, next) {
//     var sql='SELECT * FROM Category';
//     db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     res.render('category/category', { userData: data});
//   });
// });

//rest api to create a new record into mysql database

// router.get("/category-add", function (req, res, next) {
//     res.render("category/create");
//   });
  
//   router.post('/category-add', function(req, res, next) {
//     var category_name= req.body.cname;
//     var pid=req.body.pid;
  
//      sql = `INSERT INTO Category (category_name,pid) VALUES ("${category_name}","${pid}")`;
//      db.query(sql, function(err, result) {
//       if (err) throw err;
//       console.log('record inserted');
//       //var msg = "category inserted Successfully";

//       res.redirect('category/category');
    
//     });
//   });

//   router.get('/category-delete/:id', (req, res) => {
//     db.query('DELETE FROM Category WHERE cid = ?', [req.params.id], (err, rows, fields) => {
//     if (!err){
//         res.send('category Record deleted successfully.');
//         console.log("Deleted record");
//     }

//     else
//     console.log(err);
//     })
//     });
  
// // SHOW EDIT Category Form
// router.get('/category-edit/:id', function(req, res, next) {
//     var category_id= req.params.id;
//     var sql=`SELECT * FROM Category WHERE cid=${category_id}`;
//     db.query(sql, function (err, data) {
//       if (err) throw err;
     
//       res.render('category/edit', {editData: data[0]});
//     });
// });
// router.post('/category-edit/:id', function(req, res, next) {
// var id= req.params.id;
//   var updateData=req.body;
//   var sql = `UPDATE Category SET ? WHERE cid= ?`;
//   db.query(sql, [updateData, id], function (err, data) {
//   if (err) throw err;
//   console.log(data.affectedRows + " record(s) updated");
// });
// //res.redirect('/category/category');
// res.send('Product updated successfully.');
// });
module.exports = router;