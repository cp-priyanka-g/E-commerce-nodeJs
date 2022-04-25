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
    "SELECT s.Description,s.price,s.cid,p.product_name from SubCategory as s JOIN Product as p ON s.pid = p.pid",
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
  var startprice = req.query.startprice;
  var endprice = req.query.endprice;

  db.query(
    "SELECT  *from SubCategory where price >= ? AND price <=?",
    [startprice, endprice],
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("searchprice", { data: "" });
      } else {
        console.log(rows);
        res.render("searchprice", { data: rows });
      }
    }
  );
}

function searchproductbyname(req, res) {
  var Description = req.body.Description;

  db.query(
    "SELECT  *from SubCategory where Description like ?",
    Description,
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        //res.render("searchbyname",{data:" "});
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
