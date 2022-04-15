var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/product-list', function(req, res, next) {
    var sql='SELECT * FROM Product';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('product', { userData: data});
  });
});
module.exports = router;