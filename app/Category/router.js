const express = require("express");
const router = express.Router();
const {
  viewCategory,
  actioanCreateCategory,
  actioanUpdateCategory,
  actioanDeleteCategory,
} = require("./controller");

router.get("/category", viewCategory);
router.post("/category", actioanCreateCategory);
router.patch("/category/:id", actioanUpdateCategory);
router.delete("/category/:id", actioanDeleteCategory);

module.exports = router;
