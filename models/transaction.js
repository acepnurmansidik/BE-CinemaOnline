"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
      transaction.belongsTo(models.film, {
        as: "films",
        foreignKey: {
          name: "filmId",
        },
      });
    }
  }
  transaction.init(
    {
      status: DataTypes.ENUM("approved", "pending", "cancel"),
      accountNumber: DataTypes.INTEGER,
      transferProof: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      filmId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
