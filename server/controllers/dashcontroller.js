const express = require("express");
const db = require("../../database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.dashboardf1 = (req, res) => {
  db.query("SELECT ;", (err, fields, result) => {
    if (!err) {
      console.log(fields);
      res.render("dashboard", { bookData: fields });
    } else {
      throw err;
    }
  });
};
