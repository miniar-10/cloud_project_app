const mysql=require('mysql')

let db_con = mysql.createConnection({
  host: "my-db-instance.c0rznvbeuzkj.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin",
  port: 80,
  database:"users"
});

module.exports=db_con;