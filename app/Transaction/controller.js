const { transaction, film, user } = require("../../models");

module.exports = {
  actioanCreateTransaction: async (req, res) => {
    try {
      const { transferProof, accountNumber, filmId } = req.body;

      if (!accountNumber) {
        return res.status(500).json({
          status: "failed",
          message: "Account number cannot be empty!",
        });
      }
      if (!filmId) {
        return res.status(500).json({
          status: "failed",
          message: "Please choose your movie!",
        });
      }
      // check if movei not registered
      let filmExist = await film.findOne({ where: { id: filmId } });
      if (!filmExist) {
        return res.status(404).json({
          status: "failed",
          message: "Movie not found, choose your movie!",
        });
      }

      const data = await transaction.create({
        transferProof,
        accountNumber,
        filmId,
        userId: req.userLogin.id,
      });

      res.status(201).json({
        status: "success",
        message:
          "Transaction success, please wait 1x 24 hours for confirm your payment",
        data: { data },
      });
      const payload = req.body;
      console.log(payload);
    } catch (err) {
      console.log(err);
    }
  },
  actioanUpdateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { status = "" } = req.query;

      if (status.length) {
        const data = await transaction.update(
          { status },
          {
            where: {
              id,
            },
          }
        );

        res.status(201).json({
          status: "success",
          message: "Successfuly change status payment",
          data: { data },
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  viewAllTransaction: async (req, res) => {
    try {
      const { status = "" } = req.query;
      let data;
      if (req.userLogin.status == "admin") {
        if (status.length) {
          data = await transaction.findAll({
            where: {
              status,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: film,
                as: "films",
                attributes: ["id", "title", "thumbnail", "price"],
              },
              {
                model: user,
                as: "users",
                attributes: ["id", "email", "fullname", "phone"],
              },
            ],
          });
        } else {
          data = await transaction.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: film,
                as: "films",
                attributes: ["id", "title", "thumbnail", "price"],
              },
              {
                model: user,
                as: "users",
                attributes: ["id", "email", "fullname", "phone"],
              },
            ],
          });
        }
      } else {
        data = await transaction.findAll({
          where: { userId: req.userLogin.id },
        });
      }
      res.status(200).json({
        status: "success",
        message: "Successfuly data obtained",
        data: { data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
