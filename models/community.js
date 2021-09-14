'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Community.init(
    {
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      community_ip: DataTypes.STRING,
      community_status: DataTypes.INTEGER,
      community_address1: DataTypes.STRING,
      community_address2: DataTypes.STRING,
      community_pincode: DataTypes.STRING,
      community_name: DataTypes.STRING,
      community_delivery_charge: DataTypes.DOUBLE,
      community_city: DataTypes.STRING,
      community_is_active: DataTypes.INTEGER,
      community_state_id: DataTypes.INTEGER,
      community_latitude: DataTypes.INTEGER,
      community_longitude: DataTypes.INTEGER,
      community_is_mon_schedule: DataTypes.INTEGER,
      community_is_tue_schedule: DataTypes.INTEGER,
      community_is_wed_schedule: DataTypes.INTEGER,
      community_is_thu_schedule: DataTypes.INTEGER,
      community_is_fri_schedule: DataTypes.INTEGER,
      community_is_sat_schedule: DataTypes.INTEGER,
      community_is_sun_schedule: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Community',
      tableName: 'tbl_community',
      freezeTableName: true,
    }
  );

  Community.associate = function (models) {
    // associations can be defined here
    Community.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
  };
  return Community;
};
