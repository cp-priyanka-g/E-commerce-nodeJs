var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
var products= require('../controller/all_product.js');
const {response}=require("express");

//rest api to create a new record into mysql database

router.get("/product-list",function(req,response,next){
  products.Product(req,response);
  });
  router.get("/product-show",function(req,response,next){
    products.Productshow(req,response);
    });

router.get("/product-add", function (req, res, next) {
  res.render("product/create");
});

router.post("/product-add", function (req, res, next) {
  products.Create(req,res);
});

router.get("/product-delete/:id", function (req, res, next) {
  products.Delete(req,res);
});

router.get("/product-edit/:id", function (req, res, next) {
  products.Edit(req,res);
});

router.post("/product-edit/:id", function (req, res, next) {
  products.Update(req,res);
});

module.exports = router;