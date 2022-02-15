const { category } = require("../../models");

module.exports = {
  viewCategory: async (req, res) => {
    try {
      const categories = await category.findAll();

      res.status(200).json({ data: { categories } });
    } catch (err) {
      console.log(err.message);
    }
  },
  actioanCreateCategory: async (req, res) => {
    try {
      const payload = req.body;

      const data = await category.create({ ...payload });

      res.status(201).json({ data: { data } });
    } catch (err) {
      console.log(err.message);
    }
  },
  actioanUpdateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const data = await category.update({ ...payload }, { where: { id } });

      res.status(201).json({ data: { data } });
    } catch (err) {
      console.log(err.message);
    }
  },
  actioanDeleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await category.destroy({ where: { id } });

      res.status(201).json({ data: { data } });
    } catch (err) {
      console.log(err.message);
    }
  },
};
