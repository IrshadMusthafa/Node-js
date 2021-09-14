'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deliverylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  deliverylist.init(
    {
        o_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      o_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      o_customer_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_customer_apartment_no: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // o_customer_mobile_no: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      // },
      o_customer_community_id: {
        allowNull: false,
        type : DataTypes.INTEGER,
      },
      o_date:{
        allowNull: false,
        type: DataTypes.DATE,

      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'deliverylist',
      // tableName: 'tbl_unit',
      tableName: 'tbl_order',
      freezeTableName: true,
    }
  );
  deliverylist.associate = function (models) {
    // associations can be defined here
    deliverylist.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    deliverylist.belongsTo(models.customer, {
      foreignKey: 'o_customer_id',
    
      targetKey: 'customer_id'
    });
   deliverylist.belongsTo(models.Community,{
     foreignKey: 'o_customer_community_id',
     targetKey: 'community_id'
   })

  };
  


  return deliverylist;
};
