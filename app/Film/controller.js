const { category, film } = require("../../models");

module.exports = {
  viewFilm: async (req, res) => {
    try {
      const films = await film.findAll({
        include: {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      res.status(200).json({ data: { films } });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionCreateFilm: async (req, res) => {
    try {
      const payload = req.body;
      const dataFilm = await film.create({ ...payload });
      res.status(201).json({ data: { film: dataFilm } });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionUpdateFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, filmUrl, description, thumbnail, categoryId } =
        req.body;
      const dataFilm = await film.update(
        { title, price, filmUrl, description, thumbnail, categoryId },
        { where: { id } }
      );
      res.status(201).json({ data: { film: dataFilm } });
    } catch (err) {
      console.log(err.message);
    }
  },
};
