'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init(
    {
        company_id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      company_ip: DataTypes.STRING,
      company_status: DataTypes.INTEGER,
      company_unqid: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      company_name: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_shortcode: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      company_date: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
      company_time: {
        // allowNull: false,
        type: DataTypes.TIME,
      },
      company_person: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_design: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_mob: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_land: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_email: {
        // allowNull: false,
        type: DataTypes.STRING,
      },

      company_web: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      company_district: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      company_state: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      company_pin: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      company_gstin: {
        // allowNull: false,
        type: DataTypes.STRING
      },
      company_pan: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },
      company_cin	: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_tds: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_logo: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_latitude: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      company_longitude: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        // allowNull: false,
        type: DataTypes.TIME,
      },
      updatedAt: {
        // allowNull: false,
        type: DataTypes.TIME,
      },
      
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Company',
      // tableName: 'tbl_unit',
      tableName: 'tbl_company',
      freezeTableName: true,
    }
  );
  Company.associate = function (models) {
    // associations can be defined here
    Company.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    // Company.belongsTo(models.states, {
    //   foreignKey: 'company_state',
    
    //   targetKey: 'state_name'
    // });
    // vieworder.belongsTo(models.customer, {
    //   foreignKey: 'o_customer_mobile_no',
    //   targetKey: 'customer_id'
    // });

  };
  


  return Company;
};
