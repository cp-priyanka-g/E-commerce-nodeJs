var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
var search= require('../controller/search.js');
const {response}=require("express");

//rest api to create a new record into mysql database

router.get("/search-category/:id",function(req,response,next){
  search.subcategorybyid(req,response);
  });

  router.get("/search-subcategory/:id",function(req,response,next){
    search.categoryproductbyid(req,response);
    });

module.exports = router;