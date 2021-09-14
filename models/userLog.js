'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userLog.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      activity_ip: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      activity_action: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      activity_user: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      activity_user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      activity_desc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'userLog',
      tableName: 'user_activity_logs',
      freezeTableName: true,
    }
  );
  return userLog;
};
