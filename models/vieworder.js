'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vieworder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vieworder.init(
    {
        o_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      o_ip: DataTypes.STRING,
      o_status: DataTypes.INTEGER,
      o_from: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_branch_id: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      o_date: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
      o_time: {
        // allowNull: false,
        type: DataTypes.TIME,
      },
      o_payment_mode: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_pay_status: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_customer_id: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_customer_apartment_no: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      o_customer_mobile_no: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },

      o_delivery_instructions: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      o_subtotal: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_gst: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_delivery_charge: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_total: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_delivery_date: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
      o_approved_status: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_approved_on: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_approved_by: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_invoiced: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      o_return_status: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      order_cancel: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      order_cancel_date: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
      order_cancel_comments: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      order_cancel_by: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'vieworder',
      // tableName: 'tbl_unit',
      tableName: 'tbl_order',
      freezeTableName: true,
    }
  );
  vieworder.associate = function (models) {
    // associations can be defined here
    vieworder.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    vieworder.belongsTo(models.customer, {
      foreignKey: 'o_customer_id',
    
      targetKey: 'customer_id'
    });
    // vieworder.belongsTo(models.customer, {
    //   foreignKey: 'o_customer_mobile_no',
    //   targetKey: 'customer_id'
    // });

  };
  


  return vieworder;
};
