'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  brand.init(
    {
        brand_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      brand_ip: DataTypes.STRING,
      brand_status: DataTypes.INTEGER,
      brand_name_english: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      brand_name_malayalam: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      brand_image: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      web_banner_image: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      mobile_banner_image: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      brand_priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      brand_premium_status: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      brand_is_active: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'brand',
      
      tableName: 'tbl_brand',
      freezeTableName: true,
    }
  );
  brand.associate = function (models) {
    // associations can be defined here
    brand.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
   

  };
  


  return brand;
};
