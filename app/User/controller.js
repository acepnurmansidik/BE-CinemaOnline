const { user } = require("../../models");

module.exports = {
  viewProfileLogin: async (req, res) => {
    try {
      let userExist = await user.findOne({
        where: { id: req.userLogin.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        status: "success",
        data: {
          user: userExist,
        },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
