// var express = require('express')
var express =require('express')
var app = express()

var mysql = require('mysql')

var myConnection = require('express-myconnection')

var config = require('./config')
var dbOptions = {
 host: "my-db-instance.c0rznvbeuzkj.us-east-1.rds.amazonaws.com",
 user: "admin",
 password: "adminadmin",
//  port: config.database.port,
 database: "nodejs_crud",
}

app.use(myConnection(mysql, dbOptions, 'pool'))

// console.log('MySQL Database is connected Successfully');
//         connection.query("CREATE DATABASE IF NOT EXISTS testing", function (err) {
//             if (err) throw err;
//             console.log("Database created");

//             connection.query("USE testing", function (err) {
//                 if (err) throw err;
//                 console.log("Database testing is being used");
//                 var sql = "CREATE TABLE IF NOT EXISTS sample_data (id INT(10) NOT NULL, first_name VARCHAR(250) NOT NULL, last_name VARCHAR(250) NOT NULL, age VARCHAR(30) NOT NULL, gender VARCHAR(30) NOT NULL)";
//                 connection.query(sql, function (err, result) {
//                     if (err) throw err;
//                     console.log("Table created");
//                 });
//             });
//         });

app.set('view engine', 'ejs')

var index = require('./routes/index')
var users = require('./routes/users')

var expressValidator = require('express-validator')
app.use(expressValidator())

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var methodOverride = require('method-override')

app.use(methodOverride(function (req, res) {
 if(req.body && typeof req.body === 'object' && '_method' in req.body){
  var method = req.body._method
  delete req.body._method
  return method
 }
}))

var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser('keyboard1'))
app.use(session({
 secret: 'keyboard1',
 resave: false,
 saveUninitialized: true,
 cookie: { maxAge:60000 }
}))

app.use(flash())

app.use('/', index)
app.use('/users', users)

app.listen(80, '127.0.0.1', function(){
 console.log("Server port: 80")
})