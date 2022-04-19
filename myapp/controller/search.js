const db= require("../database/config");


function categoryproductbyid(req,response){
    var  catId=req.params.id;
    db.query("select *from Category left joins Product on Category.pid=Product."+[catId],function(err){
        if(err){
            req.flash("Error",err);
            response.render("product",{data:""});
            }else{
            response.render("product",{data:rows});
            }
    });
    }
    

    function subcategorybyid(req, response){
        var subcatid=req.params.id;
        db.query("SELECT * from SubCategory where sid= "+subcatid,function(err,rows){
        if(err){
        req.flash("Error",err);
        response.render("product",{data:""});
        }else{
        response.render("product",{data:rows});
        }
        });
        }

module.exports={ subcategorybyid,categoryproductbyid}
