'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Branch.init({
    company_id: DataTypes.INTEGER,
    branch_name: DataTypes.STRING,
    branch_person: DataTypes.STRING,
    branch_design: DataTypes.STRING,
    branch_mob: DataTypes.STRING,
    branch_land: DataTypes.STRING,
    branch_email: DataTypes.STRING,
    branch_web: DataTypes.STRING,
    branch_address: DataTypes.STRING,
    branch_state: DataTypes.INTEGER,
    branch_district: DataTypes.INTEGER,
    branch_pin: DataTypes.INTEGER,
    branch_gstin: DataTypes.STRING,
    branch_pan: DataTypes.STRING,
    branch_cin: DataTypes.STRING,
    branch_tds: DataTypes.STRING,
    branch_logo: DataTypes.STRING,
    branch_latitude: DataTypes.STRING,
    branch_longitude: DataTypes.STRING,
    branch_delivery_area: DataTypes.STRING,
    status: DataTypes.INTEGER,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};