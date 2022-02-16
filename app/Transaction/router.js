const express = require("express");
const { isLoginAuthorization } = require("../middleware");
const {
  actioanCreateTransaction,
  actioanUpdateTransaction,
  viewAllTransaction,
} = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.get("/transaction", viewAllTransaction);
router.post("/transaction", actioanCreateTransaction);
router.patch("/transaction/:id", actioanUpdateTransaction);

module.exports = router;
