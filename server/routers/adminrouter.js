const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admincontroller");

router.get("/admin", admincontroller.loginGet);
router.get("/admin", admincontroller.loginPost);

module.exports = router;
