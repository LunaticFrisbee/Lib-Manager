const express = require("express");
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
          if (row[0]["password"] == hashedPass) {
            console.log("Admin login successful");
            // res.redirect("/dashboard")
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
