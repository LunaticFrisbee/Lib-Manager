const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: "3306",
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASS
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to db");
    console.log(err);
    return;
  }
  console.log("Connection established");
});

module.exports = connection;
