const express = require("express");
const { isLoginAuthorization } = require("../middleware");
const { actioanCreateTransaction } = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/transaction", actioanCreateTransaction);

module.exports = router;
