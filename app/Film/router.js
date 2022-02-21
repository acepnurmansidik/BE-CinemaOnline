const express = require("express");
const router = express.Router();
const { uploadFile } = require("../middleware/uploadFile");
const { isLoginAuthorization } = require("../middleware/index");
const {
  viewFilm,
  actionCreateFilm,
  actionUpdateFilm,
  actionDeleteFilm,
  viewDetailFilm,
  viewFilmPromo,
  viewMyListFilm,
} = require("./controller");

router.get("/film", viewFilm);
router.get("/film-promo", viewFilmPromo);
router.get("/film/:id", viewDetailFilm);

router.use(isLoginAuthorization);
router.post("/film", uploadFile("thumbnail"), actionCreateFilm);
router.patch("/film/:id", uploadFile("thumbnail"), actionUpdateFilm);
router.delete("/film/:id", actionDeleteFilm);
router.get("/my-film", viewMyListFilm);

module.exports = router;
