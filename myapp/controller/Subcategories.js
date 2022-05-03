const db = require("../database/config");

function SubCategory(req, res) {
  var sql = "SELECT * FROM SubCategory";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("subcategory/subcategory", { userData: data });
  });
}

function SubCategoryShow(req, res) {
  var sql = "SELECT * FROM SubCategory";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("subcategory", { userData: data });
  });
}

function Create(req, res, next) {
  var cid = req.body.cid;
  var pid = req.body.pid;
  var name = req.body.name;

  sql = `INSERT INTO SubCategory (name,cid,pid) VALUES ("${name}","${cid}","${pid}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    res.send("subcategory Inserted successfully");
  });
}
function Delete(req, res) {
  db.query(
    "DELETE FROM SubCategory WHERE sid = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send("category Record deleted successfully.");
        console.log("Deleted record");
      } else console.log(err);
    }
  );
}

// SHOW EDIT Category Form
function Edit(req, res, next) {
  var subcategory_id = req.params.id;
  var sql = `SELECT * FROM SubCategory WHERE sid=${subcategory_id}`;
  db.query(sql, function (err, data) {
    if (err) throw err;

    res.render("subcategory/edit", { editData: data[0] });
  });
}

function Update(req, res, next) {
  var id = req.params.id;
  var updateData = req.body;
  var sql = `UPDATE SubCategory SET ? WHERE sid= ?`;
  db.query(sql, [updateData, id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  //res.redirect('/category/category');
  res.send("Product updated successfully.");
}

module.exports = { SubCategory, SubCategoryShow, Create, Delete, Edit, Update };
