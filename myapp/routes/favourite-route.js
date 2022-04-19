var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
const {response}=require("express");
var favourite=require('../controller/wishlist.js');

router.get("/favourite-list",function(req,response,next){
    favourite.wishlist(req,response);
    });
      

router.get("/favourite-add/:id", function (req, res, next) {
        res.render('subcategory');
      });
      

router.post("/favourite-add/:id", function (req, res, next) {
    favourite.Create(req,response);
      });
      
 
  router.get("/favourite-delete/:id", function (req, res) {
    favourite.Delete(req,response);
  });
//rest api to create a new record into mysql database
  
module.exports = router;