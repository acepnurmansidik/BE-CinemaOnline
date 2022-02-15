const express = require("express");
const router = express.Router();
const { viewCategory } = require("./controller");

router.get("/category", viewCategory);

module.exports = router;
