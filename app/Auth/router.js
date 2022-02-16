const express = require("express");
const { actionRegister } = require("./controller");
const router = express.Router();

router.post("/register", actionRegister);

module.exports = router;
