// var express =require('express')
// var morgan =require("morgan");
// var mysql = require('mysql')
// const URL =require("url");
// const path=require("path")
// const fileURLToPath=URL.fileURLToPath;
// var index = require('./routes/index')
// var users = require('./routes/users')
// // var myConnection = require('express-myconnection')

// // var config = require('./config')
// // var dbOptions = {
// //  host: "my-db-instance.c0rznvbeuzkj.us-east-1.rds.amazonaws.com",
// //  user: "admin",
// //  password: "adminadmin",
// // //  port: config.database.port,
// //  database: "nodejs_crud",
// // }

// // app.use(myConnection(mysql, dbOptions, 'pool'))

// // console.log('MySQL Database is connected Successfully');
// //         connection.query("CREATE DATABASE IF NOT EXISTS testing", function (err) {
// //             if (err) throw err;
// //             console.log("Database created");

// //             connection.query("USE testing", function (err) {
// //                 if (err) throw err;
// //                 console.log("Database testing is being used");
// //                 var sql = "CREATE TABLE IF NOT EXISTS sample_data (id INT(10) NOT NULL, first_name VARCHAR(250) NOT NULL, last_name VARCHAR(250) NOT NULL, age VARCHAR(30) NOT NULL, gender VARCHAR(30) NOT NULL)";
// //                 connection.query(sql, function (err, result) {
// //                     if (err) throw err;
// //                     console.log("Table created");
// //                 });
// //             });
// //         });
// // import express from "express";
// // import path from "path";
// // import { createRequire } from "module";
// // import db_con from "./db.js";
// let db_con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     port: 3306,
//     database: "",
//   });
  
// var databaseExists = false;

// // import customerRoutes from "./routes/customer.routes.js";


// const app = express();
// // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // settings
// app.set("port", process.env.PORT || 3000);
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// // middlewares
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));

// // routes

//  app.use('/', index)
//  app.use('/users', users)

// // static files
// app.use(express.static(path.join(__dirname, "public")));

// db_con.connect((err) => {
//   if (err) {
//     console.log("Database Connection Failed !!!", err);
//   } else {
//     databaseExists = true;
//     console.log("connected to Database");
//   }



//   const databaseName = `nodejs_crud`;
//   const createQuery = `CREATE DATABASE ${databaseName};`;
//   const useQuery = `use ${databaseName};`;
//   const createTableQuery =
//     "CREATE TABLE users (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL,age Number, email VARCHAR(100) NOT NULL);";

//   if (!databaseExists) {
//     try {
//       db_con.query(createQuery, (err) => {
//         if (err) throw err;

//         console.log("Database created successfully!");
//         db_con.query(useQuery, (err1) => {
//           if (err1) throw err1;
//           console.log("Used database successfully!");
//           db_con.query(createTableQuery, (err2) => {
//             if (err2) throw err2;
//             console.log("Created table successfully!");
//           });
//         });
//       });
//     } catch (error) {
//       console.log(`Database ${databaseName} already exists`);
//     }
//   }
// });
// app.listen(3000);
// console.log(`server on port ${3000}`);








var express =require('express')
var app = express()
var usersRouter=require('./routes/users.js')
var mysql = require('mysql')

var myConnection = require('express-myconnection')

var config = require('./config')

let db_con = mysql.createConnection({
    host: "my-db-instance.c0rznvbeuzkj.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "adminadmin",
    port: 80,
    database:""
  });


  console.log("still here ")
  let databaseName = "users";
  
  // let createQuery = `CREATE DATABASE  IF NOT EXISTS ${databaseName}`;

  db_con.connect(function(error){
    if(error)
    {

        // throw error;
    }
    else
    {
        console.log('MySQL Database is connected Successfully');
        db_con.query("CREATE DATABASE IF NOT EXISTS users", function (err) {
            if (err) throw err;
            console.log("Database created");
             db_con = mysql.createConnection({
                host: "my-db-instance.c0rznvbeuzkj.us-east-1.rds.amazonaws.com",
                user: "admin",
                password: "adminadmin",
                port: 3306,
                database:databaseName,
              });

            db_con.query("USE users", function (err) {
                if (err) throw err;
                console.log("Database users is being used");
                var sql = "CREATE TABLE IF NOT EXISTS users (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL,age NUMERIC, email VARCHAR(100) NOT NULL );";
                db_con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Table created");
                });
            });
        });
    }
});




app.set('view engine', 'ejs')
app.set("views", "./views");

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
app.use('/users',usersRouter)

app.listen(80, '127.0.0.1', function(){
 console.log("Server port: 80")
})




// starting the server
// export default app;

// app.set('view engine', 'ejs')

// 

// var expressValidator = require('express-validator')
// app.use(expressValidator())

// var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// var methodOverride = require('method-override')

// app.use(methodOverride(function (req, res) {
//  if(req.body && typeof req.body === 'object' && '_method' in req.body){
//   var method = req.body._method
//   delete req.body._method
//   return method
//  }
// }))

// var flash = require('express-flash')
// var cookieParser = require('cookie-parser')
// var session = require('express-session')

// app.use(cookieParser('keyboard1'))
// app.use(session({
//  secret: 'keyboard1',
//  resave: false,
//  saveUninitialized: true,
//  cookie: { maxAge:60000 }
// }))

// app.use(flash())

// app.use('/', index)
// app.use('/users', users)

// app.listen(80, '127.0.0.1', function(){
//  console.log("Server port: 80")
// })