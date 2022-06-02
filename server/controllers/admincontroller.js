const express = require("express");
const { redirect } = require("express/lib/response");
const db = require("../../database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//LoginGet implemented
exports.loginGet = (req, res) => {
  res.sendFile("Static/adminLogin.html", { root: "." });
};

//LoginPost implemented
exports.loginPost = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.query(
    "SELECT * FROM admin WHERE username = " + db.escape(username) + ";",
    (err, row) => {
      if (!err) {
        if (row[0] === undefined) {
          res.send("Wrong credentials :)");
        } else {
          console.log(row[0]["salt"]);
          let saltedPass = password + row[0]["salt"];
          console.log(row[0]["password"]);
          let crypto = require("crypto");
          const hashedPass = crypto
            .createHash("sha256")
            .update(saltedPass)
            .digest("base64");
          console.log(hashedPass);
          if (row[0]["password"] == hashedPass) {
            console.log("Admin login successful");
            req.session.admin = true;
            req.session.name = row[0]["username"];
            console.log(req.session.name);
            console.log(req.session.admin);
            res.redirect("/admin/admin-dashboard");
          } else {
            res.send("Entered password is incorrect");
          }
        }
      } else {
        console.log(err);
      }
    }
  );
};

//
exports.dashboardView = (req, res) => {
  if (req.session.admin) {
    db.query("SELECT * FROM books;", (err, data) => {
      if (err) throw err;
      console.log(data);
      res.render("admin-dashboard", { layout: "admindashLayout", data: data });
    });
  } else {
    res.redirect("/admin/logout");
  }
};

exports.addBooksView = (req, res) => {
  if (req.session.admin) {
    res.sendFile("Static/adminAddBooks.html", { root: "." });
  }
};

exports.addBooks = (req, res) => {
  if (req.session.admin) {
    const isbn = req.body.isbn;
    const name = req.body.name;
    const quantity = req.body.quantity;

    db.query(
      "SELECT * FROM books WHERE isbn = " + db.escape(isbn) + ";",
      (err, row) => {
        if (err) throw err;
        if (row[0] === undefined) {
          db.query(
            "INSERT INTO books (title, quantity, isbn) VALUES (" +
              db.escape(name) +
              ", " +
              db.escape(quantity) +
              ", " +
              db.escape(isbn) +
              ";",
            (err, row) => {
              if (err) throw err;
              console.log("Books added into db");
              res.redirect("/admin/admin-dashboard");
            }
          );
        } else {
          if (name == row[0]["title"]) {
            const x = row[0]["quantity"];
            x = x + quantity;
            db.query(
              "UPDATE books SET quantity = " +
                db.escape(x) +
                " WHERE isbn = " +
                db.escape(isbn) +
                ";",
              (err, row) => {
                if (err) throw error;
                console.log("Existing book's quantity updated");
              }
            );
          } else {
            res.send("Entered book's title and isbn do not match");
          }
        }
      }
    );
  } else {
    res.redirect("/admin/logout");
  }
};

exports.removeBooksView = (req, res) => {
  if (req.session.admin) {
    db.query("SELECT isbn, title, quantity FROM books ;", (err, data) => {
      if (err) throw err;
      console.log(data);
      res.render("removeBooks", { layout: "removeBooksLayout", data: data });
    });
  } else {
    res.redirect("/admin/logout");
  }
};

exports.removeBooks = (req, res) => {
  if (req.session.admin) {
    const quantity = req.body.quantity;
    const isbn = req.body.bookID;
    db.query(
      "SELECT isbn, title, quantity FROM books WHERE isbn = " +
        db.escape(isbn) +
        "; ",
      (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log(data[0]["quantity"]);
        const x = data[0]["quantity"] - quantity;
        if (x >= 0) {
          db.query(
            "UPDATE books SET quantity = " + db.escape(x) + ";",
            (err, row) => {
              if (err) throw err;
              console.log("Existing book's quantity updated");
            }
          );
        } else {
          res.send("Quantity of books lower than what you want to delete");
        }
      }
    );
  } else {
    res.redirect("/admin/logout");
  }
};

exports.viewReqs = (req, res) => {
  if (req.session.admin) {
  } else {
    res.redirect("/admin/logout");
  }
};

exports.accept = (req, res) => {
  if (req.session.admin) {
  } else {
    res.redirect("/admin/logout");
  }
};

exports.deny = (req, res) => {
  if (req.session.admin) {
  } else {
    res.redirect("/admin/logout");
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie(req.session.name);
  req.session.destroy();
  res.redirect("/admin");
};
