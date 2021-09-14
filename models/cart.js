'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init(
    {
        cart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cart_ip: DataTypes.STRING,
      cart_status: DataTypes.INTEGER,
      cart_customer_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cart_product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cart_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cart',
      
      tableName: 'tbl_cart',
      freezeTableName: true,
    }
  );
  cart.associate = function (models) {
    // associations can be defined here
    cart.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    cart.belongsTo(models.customer , {
      foreignKey: 'cart_customer_id',
      targetKey: 'customer_id',
    });
    cart.belongsTo(models.product , {
        foreignKey: 'cart_product_id',
        targetKey: 'product_id',
      });
   
  
  };


  return cart;

};

