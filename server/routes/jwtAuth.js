const router = require("express").Router();
const { registerUser, loginUser, verifyUser } = require("../controllers/authController");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, registerUser);
router.post("/login", validInfo, loginUser);
router.get("/isVerify", authorization, verifyUser);

module.exports = router;
