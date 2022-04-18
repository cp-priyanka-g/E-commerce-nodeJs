const db= require("../database/config");

function Category (req, res, next) {
    var sql='SELECT * FROM Category';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('category/category', { userData: data});
  });
}

function Create(req, res, next) {
    var category_name= req.body.cname;
    var pid=req.body.pid;
  
     sql = `INSERT INTO Category (category_name,pid) VALUES ("${category_name}","${pid}")`;
     db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      //var msg = "category inserted Successfully";
      res.render('category/create');
    
    });
  }
  
  function Delete(req, res){
    db.query('DELETE FROM Category WHERE cid = ?', [req.params.id], (err, rows, fields) => {
    if (!err){
        res.send('category Record deleted successfully.');
        console.log("Deleted record");
    }

    else
    console.log(err);
    })
    }
  
// SHOW EDIT Category Form
function Edit(req, res, next) {
    var category_id= req.params.id;
    var sql=`SELECT * FROM Category WHERE cid=${category_id}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
     
      res.render('category/edit', {editData: data[0]});
    });
}

 function Update(req, res, next) {
var id= req.params.id;
  var updateData=req.body;
  var sql = `UPDATE Category SET ? WHERE cid= ?`;
  db.query(sql, [updateData, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
});
//res.redirect('/category/category');
res.send('Product updated successfully.');
}

module.exports={Category,
    Create,
    Delete,
    Edit,
    Update}