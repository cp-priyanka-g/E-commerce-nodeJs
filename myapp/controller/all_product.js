// const conn= require("../database/config");

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