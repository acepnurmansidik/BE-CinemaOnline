const express = require("express");
const router = express.Router();
const { isLoginAuthorization } = require("../middleware/index");
const { viewProfileLogin } = require("./controller");

router.use(isLoginAuthorization);
router.get("/profile-user", viewProfileLogin);

module.exports = router;
