'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  unit.init(
    {
      unit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      unit_ip: DataTypes.STRING,
      unit_status: DataTypes.INTEGER,
      default_unit: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      product_sub_unit: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sub_unit_value: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'unit',
      // tableName: 'tbl_unit',
      tableName: 'tbl_product_unit',
      freezeTableName: true,
    }
  );
  unit.associate = function (models) {
    // associations can be defined here
    unit.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
  };
  return unit;
};
