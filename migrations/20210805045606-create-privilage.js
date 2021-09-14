'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Privilages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      privilage_name: {
        type: Sequelize.STRING
      },
      privilage_code: {
        type: Sequelize.STRING
      },
      allotted_divisions: {
        type: Sequelize.STRING
      },
      allotted_branches: {
        type: Sequelize.STRING
      },
      allotted_main_menus: {
        type: Sequelize.STRING
      },
      allotted_sub_menus: {
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
    await queryInterface.dropTable('Privilages');
  }
};