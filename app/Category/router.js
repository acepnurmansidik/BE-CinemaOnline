const express = require("express");
const router = express.Router();
const { viewCategory, actioanCreateCategory } = require("./controller");

router.get("/category", viewCategory);
router.post("/category", actioanCreateCategory);

module.exports = router;
