'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MainMenuTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MainMenuTable.hasMany(models.SubMenuTable, {
        foreignKey: 'sub_main_id',
      });
    }
  }
  MainMenuTable.init(
    {
      main_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      main_ip: DataTypes.STRING,
      main_ip: DataTypes.STRING,
      main_date: DataTypes.DATE,
      main_status: DataTypes.INTEGER,
      main_department: DataTypes.INTEGER,
      main_menuname: DataTypes.STRING,
      main_link: DataTypes.STRING,
      main_icon: DataTypes.STRING,
      menu_order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MainMenuTable',
      tableName: 'tbl_menu_main',
      freezeTableName: true,
    }
  );
  return MainMenuTable;
};
