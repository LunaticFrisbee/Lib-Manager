const express = require("express");
const db = require("../../database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.loginsubmit = (req, res) => {
  console.log(req.body);
};
