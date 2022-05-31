const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const bookcontroller = require("../controllers/bookcontroller");

// router.METHOD("/books", bookcontroller.function)

module.exports = router;
