"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      film.belongsTo(models.category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });
      film.belongsTo(models.user, {
        as: "purchasedFilms",
        foreignKey: {
          name: "filmId",
        },
      });
    }
  }
  film.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      filmUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "film",
    }
  );
  return film;
};
