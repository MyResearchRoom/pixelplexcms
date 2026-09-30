"use strict";

module.exports = (sequelize, DataTypes) => {
  const Enquiry = sequelize.define(
    "Enquiry",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      industry: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      projectType: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      displayRequirement: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      estimatedBudget: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "enquiries",
      timestamps: true,
    }
  );

  return Enquiry;
};