'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING
      },
      mob: {
        type: Sequelize.STRING
      },
      user_dob: {
        type: Sequelize.DATE
      },
      user_perm_address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      previlage: {
        type: Sequelize.STRING
      },
      user_division: {
        type: Sequelize.STRING
      },
      user_company: {
        type: Sequelize.STRING
      },
      user_branch: {
        type: Sequelize.STRING
      },
      browser_token: {
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
    await queryInterface.dropTable('Users');
  }
};