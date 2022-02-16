const express = require("express");
const {
  viewFilm,
  actionCreateFilm,
  actionUpdateFilm,
} = require("./controller");
const router = express.Router();

router.get("/film", viewFilm);
router.post("/film", actionCreateFilm);
router.patch("/film/:id", actionUpdateFilm);

module.exports = router;
