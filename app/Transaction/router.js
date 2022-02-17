const express = require("express");
const { isLoginAuthorization } = require("../middleware");
const {
  actioanCreateTransaction,
  actioanUpdateTransaction,
  viewAllTransaction,
} = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.get("/transactions", viewAllTransaction);
router.post("/transactions", actioanCreateTransaction);
router.patch("/transactions/:id", actioanUpdateTransaction);

module.exports = router;
