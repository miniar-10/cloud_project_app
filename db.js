const mysql=require('mysql')

let db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database:"users"
});

module.exports=db_con;