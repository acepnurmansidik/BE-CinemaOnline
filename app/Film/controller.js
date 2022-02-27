const { category, film, sequelize, transaction } = require("../../models");
const { uploadPath } = require("../../config");
const { Op } = require("sequelize");

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
        order: sequelize.random(),
      });

      films.map((item) => {
        item.thumbnail = uploadPath + item.thumbnail;
      });

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: { films },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  viewFilmPromo: async (req, res) => {
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
        limit: 3,
      });

      films.map((item) => {
        item.thumbnail = uploadPath + item.thumbnail;
      });

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: { films },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  viewMyListFilm: async (req, res) => {
    try {
      const films = await transaction.findAll({
        where: {
          userId: req.userLogin.id,
          status: "approved",
        },
        attributes: ["id", "orderDate"],
        include: {
          model: film,
          as: "films",
          attributes: ["id", "title", "thumbnail"],
        },
      });

      films.map((item) => {
        item.films.thumbnail = uploadPath + item.films.thumbnail;
      });

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: { films },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionCreateFilm: async (req, res) => {
    try {
      const payload = req.body;
      const dataFilm = await film.create({
        ...payload,
        thumbnail: req.file.filename,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully created film",
        data: { film: dataFilm },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionUpdateFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      let dataFilm;

      if (req.file) {
        dataFilm = await film.update(
          { ...payload, thumbnail: req.file.filename },
          {
            where: { id },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }
        );
      } else {
        dataFilm = await film.update(
          { ...payload },
          {
            where: { id },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }
        );
      }
      res.status(201).json({
        status: "success",
        message: "Successfully update film",
        data: { film: dataFilm },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
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
      res.status(500).json({ status: "failed", message: "Server error" });
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

      films.thumbnail = uploadPath + films.thumbnail;

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: { book: films },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  searchFilms: async (req, res) => {
    try {
      const { sc = "" } = req.query;
      let data;
      if (sc) {
        data = await film.findAll({
          where: {
            title: {
              [Op.like]: `%${sc}%`,
            },
          },
        });
      }

      data.map((item) => {
        item.thumbnail = uploadPath + item.thumbnail;
      });

      res.status(200).json({
        status: "success",
        message: "data has been obtained",
        data: { films: data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
