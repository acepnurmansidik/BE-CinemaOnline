const jwt = require("jsonwebtoken");
const config = require("../../config/index");

module.exports = {
  isLoginAuthorization: async (req, res, next) => {
    try {
      // check token from headers
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      // verify token
      const data = jwt.verify(token, config.jwtKey);
      if (!data) {
        throw new Error("Need Authorization!");
      }

      const userLogin = {
        id: data.id,
        email: data.email,
        fullname: data.fullname,
      };

      //   send data & token
      req.token = token;
      req.userLogin = userLogin;

      next();
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
