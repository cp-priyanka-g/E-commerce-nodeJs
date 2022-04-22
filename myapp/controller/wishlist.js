const db= require("../database/config");
const session = require("express-session");


function Create(req,res){
   
    let sid=req.params.id;
     id=2;
     sql = `INSERT INTO Favourite (sid,id) VALUES ("${sid}","${id}")`;
     db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      //var msg = "category inserted Successfully";
      console.log("Add to favourite Product");
      res.send('Added to favourite Product');
    
    });
}
    
    function Delete(req,response){
    let favourites_id=req.params.id;
    console.log(favourites_id);
    db.query("DELETE FROM Favourite where fid="+ favourites_id, function(err,rows){
    if(err){
    req.flash("error",err);
    response.render("product");
    }else {
    console.log("Unfavourite Product");
    response.send('Unfavourite Product');
    response.render("subcategory");
    }
    });
    }

       function wishlist(req,res){
        var sql='SELECT * FROM Favourite ';
       
        db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('favourite/wishlist', { userData: data});
      });

}
function Add(req, res, next) {
    var sid= req.params.id;
    var sql=`SELECT * FROM SubCategory WHERE sid=${sid}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      res.render('favourite/create', {editData: data[0]});
    });
  }
   
    module.exports={Create,wishlist,Delete,Add}; 