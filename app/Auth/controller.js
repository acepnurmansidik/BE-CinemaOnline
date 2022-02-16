const { user } = require("../../models");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const config = require("../../config/index");

module.exports = {
  actionRegister: async (req, res) => {
    try {
      let { password, email, fullname } = req.body;

      if (!isEmail(email)) {
        return res.status(400).json({
          status: "failed",
          message: "The email you entered is incorrect, please check again!",
        });
      }
      if (fullname.length <= 6) {
        return res.status(400).json({
          status: "failed",
          message: "Minimum name length is 6 characters",
        });
      }
      password = await bcrypt.hash(password, 12);
      const register = await user.create({ password, email, fullname });

      const token = jwt.sign(
        {
          email,
          fullname,
        },
        config.jwtKey
      );
      res.status(201).json({
        status: "success",
        message: "Successfully created account",
        data: {
          user: {
            email: register.email,
            fullname: register.fullname,
            token,
          },
        },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExist = await user.findOne({
        where: {
          email,
        },
      });

      if (!userExist) {
        return res
          .status(404)
          .json({ status: "failed", message: "Email not register!" });
      }
      const isMatchPass = await bcrypt.compare(password, userExist.password);
      if (!isMatchPass) {
        return res
          .status(403)
          .json({ status: "failed", message: "Password your entered wrong!" });
      }

      const token = jwt.sign(
        {
          id: userExist.id,
          email: userExist.email,
          fullname: userExist.fullname,
        },
        config.jwtKey
      );

      res.status(200).json({
        status: "success",
        message: "Successfully data obtained",
        data: {
          user: {
            email: userExist.email,
            fullname: userExist.fullname,
            token,
          },
        },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
