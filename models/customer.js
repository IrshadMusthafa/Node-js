'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      customer.hasMany(models.vieworder, {
        foreignKey: 'o_customer_id',
      });
    }
    }
  
  customer.init(
    {
        customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customer_ip: DataTypes.STRING,
      customer_status: DataTypes.INTEGER,
      customer_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_mob: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customer_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      customer_apartment_no: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
     
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'customer',
      tableName: 'tbl_customer',
      freezeTableName: true,
    }
  );
  customer.associate = function (models) {
    // associations can be defined here
    customer.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
   
  
 

  };
  


  return customer;
};
