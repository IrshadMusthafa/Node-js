'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init(
    {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_ip: DataTypes.STRING,
      product_status: DataTypes.INTEGER,
      product_category: DataTypes.INTEGER,
      product_name_english: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      product_description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      product_cost: DataTypes.DOUBLE,
      product_lp: DataTypes.DOUBLE,
      product_sp: DataTypes.DOUBLE,
      product_qty: DataTypes.DOUBLE,
      product_unit_id: DataTypes.INTEGER,
      product_image_main: DataTypes.TEXT,
      product_farmer_id: DataTypes.INTEGER,
      product_healthtips: DataTypes.TEXT,
      product_sku_autogen: DataTypes.STRING,
      product_permalink: DataTypes.STRING,
      product_seo_title: DataTypes.STRING,
      product_seo_keys: DataTypes.TEXT,
      product_seo_desc: DataTypes.TEXT,
      best_seller_status: DataTypes.INTEGER,
      display_status: {
        type: DataTypes.INTEGER,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'product',
      tableName: 'tbl_products',
      freezeTableName: true,
    }
  );
  // product.associate = function (models) {
  //   // associations can be defined here
  //   product.belongsTo(models.User, {
  //     foreignKey: 'createdBy',
  //   });
  //   product.belongsTo(models.unit, {
  //     foreignKey: 'product_unit_id',
  //     targetKey: 'unit_id',
  //   });
  //   product.belongsTo(models.category, {
  //     foreignKey: 'product_category',
  //     targetKey: 'category_id',
  //   });
  // };
  return product;
};
