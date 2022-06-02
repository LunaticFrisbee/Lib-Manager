const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admincontroller");

// Routing for admin login functions
router.get("/", admincontroller.loginGet);
router.post("/", admincontroller.loginPost);

router.get("/admin-dashboard", admincontroller.dashboardView);

// Routing for logout
router.get("/logout", admincontroller.logout);

module.exports = router;
