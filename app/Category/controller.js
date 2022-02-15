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
};
