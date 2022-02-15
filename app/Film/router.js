const express = require("express");
const { viewFilm, actionCreateFilm } = require("./controller");
const router = express.Router();

router.get("/film", viewFilm);
router.post("/film", actionCreateFilm);

module.exports = router;
