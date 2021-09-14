'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  message.init(
    {
        msg_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      msg_ip: DataTypes.STRING,
      msg_status: DataTypes.INTEGER,
      message_type: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      message_datetime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      message_from: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      message_to: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      message_title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message_log: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'message',
      
      tableName: 'tbl_message_logs',
      freezeTableName: true,
    }
  );
//   message.associate = function (models) {
//     // associations can be defined here
//     message.belongsTo(models.User, {
//       foreignKey: 'createdBy',
//     });
//     message.belongsTo(models.customer , {
//       foreignKey: 'message_customer_id',
//       targetKey: 'customer_id',
//     });
//     message.belongsTo(models.product , {
//         foreignKey: 'message_product_id',
//         targetKey: 'product_id',
//       });
   
  
//   };


  return message;

};

