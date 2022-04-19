const db= require("../database/config");

function Create(req,response){
    // let prod_id=req.params.id;
    // var user_id=req.params.id;
    // response.send("hello inside create ")
    // let errors=false;
   
    // if(!errors){
    // var data={user_id:user_id,prod_id:prod_id};
    // console.log(prod_id);
    // if(user_id!=null){
    // db.query("INSERT INTO Favourite SET ?",data ,function(err,rows){
    // if(err){
    // req.flash("error",err);
    // }else {
    // response.redirect("/dashboard");
    // }
    // });
    
    // response.send("please login");
    
    // }
    // }

    let prod_id=req.params.id;
    var id=1;
  
     sql = `INSERT INTO Favourite (sid,id) VALUES ("${prod_id}","${id}")`;
     db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      //var msg = "category inserted Successfully";
      res.redirect('favourite/wishlist');
    
    });
}
    
    function Delete(req,response){
    let favourites_id=req.params.id;
    console.log(favourites_id);
    db.query("DELETE FROM Favourite where fid="+ favourites_id, function(err,rows){
    if(err){
    req.flash("error",err);
    response.render("favourite/wishlist");
    }else {
    console.log("SUccesfully delete");
    response.render("favourite/wishlist");
    }
    });
    }
    
    function wishlist (req,response){
    var user_id=req.session.user_id;
    if(user_id!=null){
    db.query("SELECT *FROM Favourite left joins Favourite on Favourite.id=Users.id", function (err,rows){
    if(err){
    req.flash("Error",err);
    response.render("favourite/wishlist",{data:""});
    }else{
    response.render("favourite/wishlist",{data:rows});
    console.log(rows);
    }});
    }else{
    response.send("please login ");
    }
}
    module.exports={Create,wishlist,Delete}; 