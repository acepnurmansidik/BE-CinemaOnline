const express = require("express");
const { viewFilm } = require("./controller");
const router = express.Router();

router.get("/film", viewFilm);

module.exports = router;
