'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banner.init(
    {
        banner_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      banner_ip: DataTypes.STRING,
      banner_status: DataTypes.INTEGER,
      banner_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      banner_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      banner_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      banner_image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      banner_image_app: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'banner',
      
      tableName: 'tbl_banner',
      freezeTableName: true,
    }
  );
  banner.associate = function (models) {
    // associations can be defined here
    banner.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
   

  };
  


  return banner;
};
