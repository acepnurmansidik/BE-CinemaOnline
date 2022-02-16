const { category, film } = require("../../models");

module.exports = {
  viewFilm: async (req, res) => {
    try {
      const films = await film.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "categoryId"],
          },
        },
      });

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: { films },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionCreateFilm: async (req, res) => {
    try {
      const payload = req.body;
      const dataFilm = await film.create({ ...payload });
      res.status(201).json({
        status: "success",
        message: "Successfully created film",
        data: { film: dataFilm },
      });
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
        {
          where: { id },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        }
      );
      res.status(201).json({
        status: "success",
        message: "Successfully update film",
        data: { film: dataFilm },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionDeleteFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const dataFilm = await film.destroy({ where: { id } });
      res.status(201).json({
        status: "success",
        message: "Successfully detele film",
        data: { film: dataFilm },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  viewDetailFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const films = await film.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId"],
        },
        include: {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: { book: films },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
