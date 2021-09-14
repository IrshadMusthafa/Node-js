'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      shortCode: {
        type: Sequelize.STRING
      },
      contactPerson: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      landLineNumber: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      companyLogo: {
        type: Sequelize.STRING
      },
      gstin: {
        type: Sequelize.STRING
      },
      panNumber: {
        type: Sequelize.STRING
      },
      cinNumber: {
        type: Sequelize.STRING
      },
      tdsNumber: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      isListed: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      company_ip: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  }
};