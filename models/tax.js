'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tax.init(
    {
       tax_slab_id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tax_slab_ip: DataTypes.STRING,
      tax_slab_status: DataTypes.INTEGER,
      tax_slab_time: {
        // allowNull: false,
        type: DataTypes.TIME,
      },
      tax_slab_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tax_slab_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tax_slab_percentage: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // tax_slab_user: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      // },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'tax',
    
      tableName: 'tbl_tax_slab',
      freezeTableName: true,
    }
  );
  tax.associate = function (models) {
    // associations can be defined here
    tax.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
   
 

  };
  


  return tax;
};
