const db= require("../database/config");

function SubCategory(req, res) {
    var sql='SELECT * FROM SubCategory';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('subcategory/subcategory',{ userData: data});
  });
}

function SubCategoryShow(req, res) {
  var sql='SELECT * FROM SubCategory';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('subcategory',{ userData: data});
});
}

 function Create(req, res, next) {
    var Description= req.body.Description;
    var cid=req.body.cid;
    var pid=req.body.pid;
    var price=req.body.price;
  
     sql = `INSERT INTO SubCategory (Description,cid,pid,price) VALUES ("${Description}","${cid}","${pid}","${price}")`;
     db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('subcategory/subcategory');
    
    });
  }
  function Delete(req, res)  {
    db.query('DELETE FROM SubCategory WHERE sid = ?', [req.params.id], (err, rows, fields) => {
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
    var subcategory_id= req.params.id;
    var sql=`SELECT * FROM SubCategory WHERE sid=${subcategory_id}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
     
      res.render('subcategory/edit', {editData: data[0]});
    });
}

function Update(req, res, next) {
var id= req.params.id;
  var updateData=req.body;
  var sql = `UPDATE SubCategory SET ? WHERE sid= ?`;
  db.query(sql, [updateData, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
});
//res.redirect('/category/category');
res.send('Product updated successfully.');
}

module.exports={ SubCategory,SubCategoryShow,
    Create,
    Delete,
    Edit,
    Update}

