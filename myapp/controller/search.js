const db = require("../database/config");

function categoryproductbyid(req, response) {
  db.query(
    "SELECT c.category_name, p.product_name FROM Category as c JOIN Product as p  ON c.pid = p.pid",
    function (err, rows) {
      if (err) {
        req.flash("Error", err);
        response.render("getcategory", { userData: "" });
      } else {
        response.render("getcategory", { userData: rows });
      }
    }
  );
}

function subcategorybyid(req, response) {
  db.query(
    "SELECT p.product_name,p.price,s.name,s.cid from SubCategory as s JOIN Product as p ON s.pid = p.pid",
    function (err, rows) {
      if (err) {
        req.flash("Error", err);
        response.render("getSubcategory", { userData: "" });
      } else {
        response.render("getSubcategory", { userData: rows });
      }
    }
  );
}

function searchproductbyprice(req, res) {
  res.render("searchprice", { data: "" });
  var startprice = req.query.startprice;
  var endprice = req.query.endprice;

  db.query(
    "SELECT  *from Product where price >= ? AND price <=?",
    [startprice, endprice],
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("searchprice", { data: err });
      } else {
        console.log(rows);
        res.render("searchprice", { data: rows });
      }
    }
  );
}

function searchproductbyname(req, res) {
  res.render("searchbyname",{ data: "" });
  var name = req.body.name;

  db.query(
    "SELECT  *from Product where name like ?",
    name,
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        
        res.render("searchbyname", { data: err });
      } else {
        console.log(rows);
        res.render("searchbyname", { data: rows });
      }
    }
  );
}

module.exports = {
  subcategorybyid,
  categoryproductbyid,
  searchproductbyprice,
  searchproductbyname,
};
