'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(12)
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
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'email is required'
        },
        notNull : {
          args : true,
          msg : 'email is required'
        },
        isEmail : {
          args : true,
          msg : 'email format failed'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'password is required'
        },
        notNull : {
          args : true,
          msg : 'password is required'
        }
      }
    },
    photo: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'photo is required'
        },
        notNull : {
          args : true,
          msg : 'photo is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user) => {
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  return User;
};