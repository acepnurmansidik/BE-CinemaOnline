const { user } = require("../../models");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const config = require("../../config/index");

module.exports = {
  register: async (req, res) => {
    try {
      const { password, email, fullname } = req.body;
      const userExist = await user.findOne({ where: { email } });
      if (userExist) {
        return res.status(400).json({
          status: "failed",
          message: "Email has been register!",
        });
      }
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

      const newPass = await bcrypt.hash(password, 12);
      const userCreate = await user.create({
        password: newPass,
        email,
        fullname,
      });
      //   create token
      const token = jwt.sign(
        {
          id: userCreate.id,
          email: userCreate.email,
          fullname: userCreate.fullname,
          status: userCreate.status,
          avatar: userCreate.avatar,
        },
        config.jwtKey
      );

      res.status(201).json({
        status: "success",
        data: {
          user: {
            email: userCreate.email,
            fullname: userCreate.fullname,
            token,
          },
        },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await user.findOne({ where: { email } });

      if (userExist) {
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {
          const token = jwt.sign(
            {
              id: userExist.id,
              email: userExist.email,
              fullname: userExist.fullname,
              status: userExist.status,
              avatar: userExist.avatar,
            },
            config.jwtKey
          );
          res.status(200).json({
            status: "success",
            data: {
              user: {
                email: userExist.email,
                fullname: userExist.fullname,
                token,
              },
            },
          });
        } else {
          res
            .status(403)
            .json({ status: "success", message: "Email not found" });
        }
      } else {
        res.status(404).json({ status: "success", message: "Email not found" });
      }
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
