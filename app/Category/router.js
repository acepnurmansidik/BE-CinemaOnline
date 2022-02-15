const express = require("express");
const router = express.Router();
const {
  viewCategory,
  actioanCreateCategory,
  actioanUpdateCategory,
} = require("./controller");

router.get("/category", viewCategory);
router.post("/category", actioanCreateCategory);
router.patch("/category/:id", actioanUpdateCategory);

module.exports = router;
