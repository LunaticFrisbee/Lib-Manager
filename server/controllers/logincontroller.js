const express = require("express");
const db = require("../../database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//LoginGet
exports.loginGet = (req, res) => {
  res.sendFile("Static/login.html", { root: "." });
};

//LoginPost implemented
exports.loginPost = (req, res) => {
  let enroll = req.body.enroll;
  let password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE enrollmentNo = " + db.escape(enroll) + ";",
    (err, row) => {
      if (!err) {
        if (row[0] === undefined) {
          res.send("User doesn't exist on the database");
        } else {
          console.log(row[0]["password"]);

          let crypto = require("crypto");
          let saltedPass = password + row[0]["hash"];
          const hash = crypto
            .createHash("sha256")
            .update(saltedPass)
            .digest(base64);
          if (row[0]["password"] == hash) {
            req.session.eno = row[0].enrollmentNo;

            console.log("login successful");
            res.redirect("/dashboard");
          }
        }
      }
    }
  );
};

// SignupGet implemented
exports.signupGet = (req, res) => {
  res.sendFile("Static/signup.html", { root: "." });
};

//SignupPost implemented
exports.signupPost = (req, res) => {
  function salt(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let username = req.body.username;
  let enroll = req.body.enroll;
  let password = req.body.password;
  let passwordC = req.body.passwordC;
  let crypto = require("crypto");
  var salt = salt(7);
  console.log(salt);
  let saltedPass = password + salt; //made salted password with salt as prefix
  const hash = crypto.createHash("sha256").update(saltedPass).digest("base64"); //hash generated

  db.query(
    "SELECT * FROM users WHERE enrollmentNo = " + db.escape(enroll) + ";",
    (err, row) => {
      console.log(row);
      if (row[0] === undefined) {
        console.log("New User");
        if (password == passwordC) {
          db.query(
            "INSERT INTO users (username,salt,enrollmentNo,password) VALUES(" +
              db.escape(username) +
              ", " +
              db.escape(hash) +
              ", " +
              db.escape(enroll) +
              ", " +
              db.escape(password) +
              ");",
            (err, row) => {
              if (!err) {
                console.log("Database updated with new user");
                res.redirect("/");
              } else {
                console.log(err);
              }
            }
          );
        } else {
          res.send("Both passwords are not the same :(");
        }
      }
    }
  );
};

exports.logout = (req, res) => {};
