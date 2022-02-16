const express = require("express");
const { isLoginAuthorization } = require("../middleware");
const router = express.Router();
const {
  viewCategory,
  actioanCreateCategory,
  actioanUpdateCategory,
  actioanDeleteCategory,
} = require("./controller");

router.use(isLoginAuthorization);
router.get("/category", viewCategory);
router.post("/category", actioanCreateCategory);
router.patch("/category/:id", actioanUpdateCategory);
router.delete("/category/:id", actioanDeleteCategory);

module.exports = router;
