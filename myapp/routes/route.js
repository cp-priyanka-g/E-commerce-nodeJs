var express = require("express");
var router = express.Router();
var db  = require('../database/config.js');
const flash = require('connect-flash');
router.use(flash());
var products= require('../controller/all_product.js');
var category= require('../controller/all_categories.js');
var favourite=require('../controller/wishlist.js');
var login=require('../controller/login.js');
var register=require('../controller/register.js');
var search= require('../controller/search.js');
var subcategory=require('../controller/all_subcategories.js');

// Registration Route
// to display registration form
router.get("/register", function (req, res, next) {
  res.render("registration-form");
});
router.post("/register",function (req, res) {
  register.Register(req, res)
});
  
// Admin Registration to display registration form
router.get("/admin/register", function (req, res, next) {
  res.render("registration-form");
});

router.post("/admin/register", function (req, res) {
  register.AdminRegister(req, res);
});


/* GET users listing. */

router.get("/admindashboard", function (req, res, next) {
  if (req.session.loggedinUser) {
    res.render("admindashboard", { email: req.session.emailAddress });
  } else {
    res.redirect("/login");
  }
});

  /* GET users listing. */
router.get("/dashboard", function (req, res, next) {
  if (req.session.loggedinUser) {
    res.render("dashboard", { email: req.session.emailAddress });
  } else {
    res.redirect("/login");
  }
});

//Logout Route
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});

//Category Route
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

// Favourite Route

  router.get("/favourite-list",function(req,response,next){
    favourite.wishlist(req,response);
    });

router.get("/favourite-add/:id",function (req, res, next) {
  favourite.Add(req,res);
    });
    

router.post("/favourite-add/:id", function (req, res, next) {
  favourite.Create(req,res);
    });
    

router.get("/favourite-delete/:id", function (req, res) {
  favourite.Delete(req,res);
});

//login Route
router.get('/login', function(req, res, next) {
  res.render('login-form');
});
router.post('/login', function(req, res, next) {
  login.Login(req, res);
});

//PRODUCT ROUTE
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

//Search Route

router.get("/search-subcategory",function(req,response,next){
  search.subcategorybyid(req,response);
  });

  router.get("/search-category",function(req,response,next){
    search.categoryproductbyid(req,response);
    });

  router.get("/search-byprice",function(req,response,next){
    response.render('searchprice')
      search.searchproductbyprice(req,response);
      });

  router.get("/search-byname",function(req,response,next){
    response.render('searchbyname')
        search.searchproductbyname(req,response);
        });
      
  // Subcategory Route

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

    
module.exports = router;
