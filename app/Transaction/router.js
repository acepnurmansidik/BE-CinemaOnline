const express = require("express");
const { isLoginAuthorization } = require("../middleware");
const {
  actioanCreateTransaction,
  actioanUpdateTransaction,
} = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/transaction", actioanCreateTransaction);
router.patch("/transaction/:id", actioanUpdateTransaction);

module.exports = router;
