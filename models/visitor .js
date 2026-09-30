"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    static associate(models) {
     
    }
  }

  Visitor .init(
    {
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
      sequelize,
      modelName: "Visitor",
      tableName: "visitor",
      timestamps: true,
    }
  );

  return Visitor;
};
