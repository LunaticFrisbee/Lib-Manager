const express = require("express");
const db = require("../../database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Viewing Dashboard
exports.dashboardView = (req, res) => {
  db.query("SELECT * FROM books;", (err, data) => {
    if (!err) {
      console.log(data);
      res.render("dashboard", { layout: "dashboardlayout", data: data });
    } else {
      throw err;
    }
  });
};

//Viewing CheckOut-List
exports.viewCheckoutList = (req, res) => {
  db.query("SELECT id, title, quantity FROM books ;", (err, data) => {
    if (!err) {
      console.log(data);
      res.render("checkoutList", { layout: "checkoutListLayout", data: data });
    } else {
      throw err;
    }
  });
};

// exports.RequestOut = (req, res) => {
//   const bookID = req.body.bookID;
//   db.query("INSERT INTTO requests() VALUES (" + "", (err, data) => {
//     if (err) throw err;
//   });
//   res.sent("Request for Check-out sent to Admin");
// };

// exports.RequestIn = (req, res) => {
//   const bookID = req.body.bookID;
//   db.query("", (err, data) => {
//     if (err) throw err;
//     res.send("Request for Check-in sent to Admin");
//   });
// };
