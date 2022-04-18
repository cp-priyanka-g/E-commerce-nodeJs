var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
const {response}=require("express");


router.get('/subcategory-list', function(req, res, next) {
    var sql='SELECT * FROM SubCategory';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('subcategory/subcategory', { userData: data});
  });
});

//rest api to create a new record into mysql database

router.get("/subcategory-add", function (req, res, next) {
    res.render("subcategory/create");
  });
  
  router.post('/subcategory-add', function(req, res, next) {
    var Description= req.body.Description;
    var cid=req.body.cid;
    var pid=req.body.pid;
    var price=req.body.price;
  
     sql = `INSERT INTO SubCategory (Description,cid,pid,price) VALUES ("${Description}","${cid}","${pid}","${price}")`;
     db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      //var msg = "category inserted Successfully";

      res.redirect('subcategory/subcategory');
    
    });
  });

  router.get('/subcategory-delete/:id', (req, res) => {
    db.query('DELETE FROM SubCategory WHERE sid = ?', [req.params.id], (err, rows, fields) => {
    if (!err){
        res.send('category Record deleted successfully.');
        console.log("Deleted record");
    }

    else
    console.log(err);
    })
    });
  
// SHOW EDIT Category Form
router.get('/subcategory-edit/:id', function(req, res, next) {
    var subcategory_id= req.params.id;
    var sql=`SELECT * FROM SubCategory WHERE sid=${subcategory_id}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
     
      res.render('subcategory/edit', {editData: data[0]});
    });
});
router.post('/subcategory-edit/:id', function(req, res, next) {
var id= req.params.id;
  var updateData=req.body;
  var sql = `UPDATE SubCategory SET ? WHERE sid= ?`;
  db.query(sql, [updateData, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
});
//res.redirect('/category/category');
res.send('Product updated successfully.');
});
module.exports = router;