const express = require("express");
const { actionRegister, actionLogin } = require("./controller");
const router = express.Router();

router.post("/register", actionRegister);
router.post("/login", actionLogin);

module.exports = router;
