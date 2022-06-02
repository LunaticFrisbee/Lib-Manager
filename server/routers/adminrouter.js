const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admincontroller");

// Routing for admin login functions
router.get("/", admincontroller.loginGet);
router.post("/", admincontroller.loginPost);

//Routing for dashboard
router.get("/admin-dashboard", admincontroller.dashboardView);

//Routing for adding books
router.get("/admin-dashboard/addBooks", admincontroller.addBooksView);
router.post("/admin-dashboard/addBooks", admincontroller.addBooks);

//Routing for removing books
router.get("/admin-dashboard/removeBooks", admincontroller.removeBooksView);
router.post("/admin-dashboard/removeBooks", admincontroller.removeBooks);

//Routing for requests
// router.get("/requests", admincontroller.viewReqs);
// router.post("/requests/approve", admincontroller.approve);
// router.post("/requests/deny", admincontroller.deny);

// Routing for logout
router.get("/logout", admincontroller.logout);

module.exports = router;
