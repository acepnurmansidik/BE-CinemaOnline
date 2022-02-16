const express = require("express");
const router = express.Router();
const { isLoginAuthorization } = require("../middleware");
const {
  viewFilm,
  actionCreateFilm,
  actionUpdateFilm,
  actionDeleteFilm,
  viewDetailFilm,
} = require("./controller");

router.get("/film", viewFilm);
router.get("/film/:id", viewDetailFilm);

router.use(isLoginAuthorization);
router.post("/film", actionCreateFilm);
router.patch("/film/:id", actionUpdateFilm);
router.delete("/film/:id", actionDeleteFilm);

module.exports = router;
