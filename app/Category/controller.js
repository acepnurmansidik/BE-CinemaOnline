const { category } = require("../../models");

module.exports = {
  viewCategory: async (req, res) => {
    try {
      const categories = await category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        status: "success",
        message: "Successfully created account",
        data: { categories },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actioanCreateCategory: async (req, res) => {
    try {
      const payload = req.body;

      const data = await category.create({ ...payload });

      res.status(201).json({
        status: "success",
        message: "Successfully create category",
        data: { data },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actioanUpdateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const data = await category.update({ ...payload }, { where: { id } });

      res.status(201).json({
        status: "success",
        message: "Successfully update category",
        data: { data },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actioanDeleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await category.destroy({ where: { id } });

      res.status(201).json({
        status: "success",
        message: "Successfully delete category",
        data: { data },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
