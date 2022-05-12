var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "ecommerce",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Database is connected successfully !");
  }
});

module.exports = connection;
