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
};
