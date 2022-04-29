const db = require("../database/config");
const session = require("express-session");

function Create(req, res) {
  let pid = req.params.id;
  var userid=req.session.userid;
  sql = `INSERT INTO Favourite (pid,id) VALUES ("${pid}","${userid}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
     res.send("Added to favourite Product");
  });
}

function Delete(req, response) {
  let favourites_id = req.params.id;
 
  db.query(
    "DELETE FROM Favourite where fid=" + favourites_id,
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        response.render("product");
      } else {
      
        response.send("Unfavourite Product");
        response.render("subcategory");
      }
    }
  );
}

function wishlist(req, res) {
  var userid=req.session.userid;
  var sql = "SELECT * FROM Favourite where id=?";

  db.query(sql, userid,function (err, data, fields) {
    if (err) throw err;
    res.render("favourite/wishlist", { userData: data });
  });
}
function Add(req, res, next) {
  var sid = req.params.id;
  var sql = `SELECT * FROM SubCategory WHERE sid=${sid}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render("favourite/create", { editData: data[0] });
  });
}

module.exports = { Create, wishlist, Delete, Add };
