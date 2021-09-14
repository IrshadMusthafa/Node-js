'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubMenuTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubMenuTable.belongsTo(models.MainMenuTable, {
        foreignKey: 'sub_main_id',
        onDelete: 'CASCADE',
      });
    }
  }
  SubMenuTable.init(
    {
      sub_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sub_ip: DataTypes.STRING,
      sub_date: DataTypes.DATE,
      sub_status: DataTypes.INTEGER,
      sub_main_id: DataTypes.INTEGER,
      sub_name: DataTypes.STRING,
      sub_link: DataTypes.STRING,
      sub_icon: DataTypes.STRING,
      sub_order: DataTypes.INTEGER,
      sub_option_availability: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'SubMenuTable',
      tableName: 'tbl_menu_sub',
      freezeTableName: true,
    }
  );
  return SubMenuTable;
};
