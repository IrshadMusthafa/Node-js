'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 10],
        },
      },
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      user_email: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: 'Please enter your email address' },
        validate: {
          isEmail: { args: true, msg: 'Please enter a valid email address' },
        },
        unique: { args: true, msg: 'Email already exists' },
      },
      mobile: DataTypes.STRING,
      password: DataTypes.STRING,
      previlage: DataTypes.INTEGER,
      user_branch: DataTypes.STRING,
      browser_token: DataTypes.STRING,
      status: DataTypes.INTEGER,
      user_ip: DataTypes.STRING,
      user_id: DataTypes.STRING,
      user_photo: DataTypes.TEXT,
      createdBy: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
      sequelize,
      modelName: 'User',
      tableName: 'users',
      freezeTableName: true,
    }
  );
  User.prototype.validPassword =  (password, hash) => {
    return  bcrypt.compareSync(password, hash);
   }

  return User;
};














// 'use strict';
// const {
//   Model
// } = require('sequelize');
// const bcrypt = require('bcrypt');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init({
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [5, 10]
//       }},
//     fname: DataTypes.STRING,
//     lname: DataTypes.STRING,
//     user_email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       isEmail: true,
//       validate: {
//         isUnique: function (value, next) {
//           var self = this;
//           User.findOne({ where: { user_email: value } })
//             .then(function (user) {
//               // reject if a different user wants to use the same email
//               if (user && self.id !== user.id) {
//                 return next('Email already in use!');
//               }
//               return next();
//             })
//             .catch(function (err) {
//               return next(err);
//             });
//         }
//       }
//     },
//     mob: DataTypes.STRING,
//     user_dob: DataTypes.DATE,
//     user_perm_address: DataTypes.STRING,
//     password: DataTypes.STRING,
//     previlage: DataTypes.STRING,
//     user_division: DataTypes.STRING,
//     user_company: DataTypes.STRING,
//     user_branch: DataTypes.STRING,
//     browser_token: DataTypes.STRING,
//     status: DataTypes.INTEGER,
//     ip: DataTypes.STRING
//   }, 
//   {
//     hooks: {
//       beforeCreate: async (user) => {
//        if (user.password) {
//         const salt = await bcrypt.genSaltSync(10, 'a');
//         user.password = bcrypt.hashSync(user.password, salt);
//        }
//       },
//       beforeUpdate:async (user) => {
//        if (user.password) {
//         const salt = await bcrypt.genSaltSync(10, 'a');
//         user.password = bcrypt.hashSync(user.password, salt);
//        }
//       }
//      },
//      sequelize
//   });
//   User.prototype.validPassword =  (password, hash) => {
//     return  bcrypt.compareSync(password, hash);
//    }

//   return User;
// };

