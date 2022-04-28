const db = require("../database/config");

function Product(req, res) {
  var sql = "SELECT * FROM Product";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("product/product", { userData: data });
  });
}
function Productshow(req, res) {
  var sql = "SELECT * FROM Product";

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("product", { userData: data });
  });
}
function Create(req, res, next) {
  var product_name = req.body.pname;

  sql = `INSERT INTO Product (product_name,Description,price) VALUES ("${product_name}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    res.render("product/create");
  });
}

function Delete(req, res) {
  db.query("DELETE FROM Product WHERE pid = ?", [req.params.id], (err) => {
    if (!err) {
      res.send("Product Record deleted successfully.");
      console.log("Deleted record");
    } else console.log(err);
  });
}

function Edit(req, res, next) {
  var productId = req.params.id;
  var sql = `SELECT * FROM Product WHERE pid=${productId}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render("product/edit", { editData: data[0] });
  });
}

function Update(req, res, next) {
  var id = req.params.id;
  var updateData = req.body;
  var sql = `UPDATE Product SET ? WHERE pid= ?`;
  db.query(sql, [updateData, id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  //res.redirect('product/product');
  res.send("Product updated successfully.");
}

module.exports = { Product, Productshow, Create, Delete, Edit, Update };
