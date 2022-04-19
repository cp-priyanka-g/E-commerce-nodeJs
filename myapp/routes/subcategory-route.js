var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
const {response}=require("express");
var subcategory=require('../controller/all_subcategories.js');

router.get("/subcategory-list",function(req,response,next){
    subcategory.SubCategory(req,response);
    });
      

router.get("/subcategory-show",function(req,response){
  subcategory.SubCategoryShow(req,response);
  });

router.get("/subcategory-add", function (req, res, next) {
        res.render("subcategory/create");
      });
      

router.post("/subcategory-add", function (req, res, next) {
    subcategory.Create(req,response);
      });
      
 
  router.get("/subcategory-delete/:id", function (req, res, next) {
    subcategory.Delete(req,response);
  });
  
  router.get("/subcategory-edit/:id", function (req, res, next) {
    products.Edit(req,res);
  });
  
  router.post("/subcategory-edit/:id", function (req, res, next) {
    products.Update(req,res);
  });

//rest api to create a new record into mysql database
  
module.exports = router;