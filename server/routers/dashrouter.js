const express = require("express");
const router = express.Router();
const dashcontroller = require("../controllers/dashcontroller");

router.get("/", dashcontroller.dashboardView);
router.get("/checkoutList", dashcontroller.viewCheckoutList);
// router.post("/checkinreq", dashcontroller.RequestIn);
// router.post("/checkoutreq", dashcontroller.RequestOut);

module.exports = router;
