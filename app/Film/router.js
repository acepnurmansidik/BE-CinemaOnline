const express = require("express");
const {
  viewFilm,
  actionCreateFilm,
  actionUpdateFilm,
  actionDeleteFilm,
} = require("./controller");
const router = express.Router();

router.get("/film", viewFilm);
router.post("/film", actionCreateFilm);
router.patch("/film/:id", actionUpdateFilm);
router.delete("/film/:id", actionDeleteFilm);

module.exports = router;
