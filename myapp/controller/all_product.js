const db= require("../database/config");

function Product(req,res){
         var sql='SELECT * FROM Product';
        
         db.query(sql, function (err, data, fields) {
         if (err) throw err;
         res.render('product/product', { userData: data});
       });

}
function Create(req, res, next) {
    var product_name= req.body.pname;
   
     sql = `INSERT INTO Product (product_name) VALUES ("${product_name}")`;
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');  
      res.render('./product/product')
  
    });
  }
  
  function Delete(req, res) {
    db.query('DELETE FROM Product WHERE pid = ?', [req.params.id], (err, rows, fields) => {
    if (!err){
      res.send('Product Record deleted successfully.');
      console.log("Deleted record");
      
    }
    else
    console.log(err);
    })
    }
module.exports={Product,Create,Delete}


