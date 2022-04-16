const db= require("../database/config");

// function Product(req,response){
   
//     conn.query("SELECT *FROM Product", function(err,rows){
//         console.log(rows)
//         if(err){
//             req.flash("error",err);
//             response.render("product",{data:""});
//             }else{
//                 response.render("product",{data:rows});
//             }
//     });
// }
// module.exports={Product}

function Delete(req,response){
var product_id= req.params.id;
 db.query("DELETE fro Product WHERE pid="+product_id,function(err,rows){
   if(err){
     req.flash("error",err);
    //  res.redirect('product/product');
   }else{
     req.flash("success","product deleted successfully! pid="+id);
     console.log("Deleted Successfully")
     response.redirect('admindashboard/');
   }
 });
}
module.exports=Delete;
