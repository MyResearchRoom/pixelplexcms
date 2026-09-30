"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("enquiries", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      companyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      industry: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      projectType: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      displayRequirement: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      estimatedBudget: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    await queryInterface.addIndex("enquiries", {
      fields: ["email"],
      name: "enquiry_email_idx",
    });

    await queryInterface.addIndex("enquiries", {
      fields: ["phoneNumber"],
      name: "enquiry_phone_number_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("enquiries");
  },
};