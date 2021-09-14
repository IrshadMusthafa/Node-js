'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Privilege.init(
    {
      privilege_name: DataTypes.STRING,
      privilege_code: DataTypes.STRING,
      alloted_divisions: DataTypes.STRING,
      alloted_branches: DataTypes.STRING,
      alloted_mainmenus: DataTypes.STRING,
      alloted_submenus: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Privilege',
      tableName: 'privilege',
      freezeTableName: true,
    }
  );
  return Privilege;
};
