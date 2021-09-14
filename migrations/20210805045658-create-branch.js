'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      branch_name: {
        type: Sequelize.STRING
      },
      branch_person: {
        type: Sequelize.STRING
      },
      branch_design: {
        type: Sequelize.STRING
      },
      branch_mob: {
        type: Sequelize.STRING
      },
      branch_land: {
        type: Sequelize.STRING
      },
      branch_email: {
        type: Sequelize.STRING
      },
      branch_web: {
        type: Sequelize.STRING
      },
      branch_address: {
        type: Sequelize.STRING
      },
      branch_state: {
        type: Sequelize.INTEGER
      },
      branch_district: {
        type: Sequelize.INTEGER
      },
      branch_pin: {
        type: Sequelize.INTEGER
      },
      branch_gstin: {
        type: Sequelize.STRING
      },
      branch_pan: {
        type: Sequelize.STRING
      },
      branch_cin: {
        type: Sequelize.STRING
      },
      branch_tds: {
        type: Sequelize.STRING
      },
      branch_logo: {
        type: Sequelize.STRING
      },
      branch_latitude: {
        type: Sequelize.STRING
      },
      branch_longitude: {
        type: Sequelize.STRING
      },
      branch_delivery_area: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      ip: {
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
    await queryInterface.dropTable('Branches');
  }
};