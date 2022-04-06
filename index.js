const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

var bodyparser=require("body-parser")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var bodyParser = require('body-parser');

const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
var connection  = require('./database/config.js');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

 
app.use(session({ 
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
app.use(expressValidator());

 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
   res.send('CRUD Application')
  // res.render("index")
 })

