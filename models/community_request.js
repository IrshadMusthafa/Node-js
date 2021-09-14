'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class communityRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  communityRequest.init(
    {
      request_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      request_ip: DataTypes.STRING,
      request_status: DataTypes.INTEGER,
      
      request_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      request_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      request_address1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      request_address2: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      request_pincode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      request_city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      request_state_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'communityRequest',
      // tableName: 'tbl_unit',
      tableName: 'tbl_community_request',
      freezeTableName: true,
    }
  );
  communityRequest.associate = function (models) {
    // associations can be defined here
    communityRequest.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
  };
  return communityRequest;
};