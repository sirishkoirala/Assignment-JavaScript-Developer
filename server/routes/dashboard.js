const router = require("express").Router();
const { getUserDashboard } = require("../controllers/dashboardController.js");
const authorization = require("../middleware/authorization");

router.get("/", authorization, getUserDashboard);

module.exports = router;


