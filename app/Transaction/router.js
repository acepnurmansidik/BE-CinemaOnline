const express = require("express");
const router = express.Router();
const { uploadFile } = require("../middleware/uploadFile");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actioanCreateTransaction,
  actioanUpdateTransaction,
  viewAllTransaction,
} = require("./controller");

router.use(isLoginAuthorization);
router.get("/transactions", viewAllTransaction);
router.post(
  "/transactions",
  uploadFile("transferProof"),
  actioanCreateTransaction
);
router.patch("/transactions/:id", actioanUpdateTransaction);

module.exports = router;
