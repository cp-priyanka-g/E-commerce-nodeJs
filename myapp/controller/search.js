const db= require("../database/config");


function categoryproductbyid(req,response){
      db.query("SELECT category.category_name AS Category, product.product_name AS product FROM Product  ON category.pid = products.id" ,function(err){
        if(err){
            req.flash("Error",err);
            response.render("product",{data:""});
            }else{
            response.render("product",{data:rows});
            }
    });
    }
   

    function subcategorybyid(req, response){
        db.query("SELECT SubCategory.Description AS SubCategory, product.product_name AS product FROM Product  ON SubCategory.pid = products.id"+subcatid,function(err,rows){
        if(err){
        req.flash("Error",err);
        response.render("product",{data:""});
        }else{
        response.render("product",{data:rows});
        }
        });
        }

        function searchproductbyprice(req,response){
            var startprice=req.query.startprice;
            var endprice=req.query.endprice;
            db.query("SELECT  *from SubCategory where price >= ? AND price<=?",[startprice,endprice],function(err,rows){
            if(err){
            req.flash("error",err);
            res.render("searchbyprice",{data:""});
            }else{
            console.log(rows);
            res.render("searchbyprice",{data:rows});
            }
            });
            }
            
            function searchproductbyname(req,response){
            var textbox1=req.body.pname;
            
            db.query("SELECT  *from SubCategory where Description like ?",textbox1 ,function(err,rows){
            if(err){
            req.flash("error",err);
            res.render("searchbyname",{data:" "});
            }else{
            console.log(rows);
            res.render("searchbyname",{data:rows});
            }
            });
            }
            
module.exports={ subcategorybyid,categoryproductbyid,searchproductbyprice,searchproductbyname}
