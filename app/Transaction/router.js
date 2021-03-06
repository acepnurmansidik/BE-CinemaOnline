const express = require("express");
const router = express.Router();
const { uploadFile } = require("../middleware/uploadFile");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actioanCreateTransaction,
  actioanUpdateTransaction,
  viewAllTransaction,
  viewDetailTransaction,
} = require("./controller");

router.use(isLoginAuthorization);
router.get("/transactions", viewAllTransaction);
router.get("/transactions/:id", viewDetailTransaction);
router.post(
  "/transactions",
  uploadFile("transferProof"),
  actioanCreateTransaction
);
router.patch(
  "/transactions/:id",
  uploadFile("transferProof"),
  actioanUpdateTransaction
);

module.exports = router;
