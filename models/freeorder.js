'use strict';
const {
  Model
} = require('sequelize');
const macaddress = require('macaddress');
module.exports = (sequelize, DataTypes) => {
  class FreeOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  FreeOrder.init({
    service: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'service is required'
        },
        notNull : {
          args : true,
          msg : 'service is required'
        }
      }
    },
    target: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'target is required'
        },
        notNull : {
          args : true,
          msg : 'target is required'
        }
      }
    },
    quantity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'quantity is required'
        },
        notNull : {
          args : true,
          msg : 'quantity is required'
        }
      }
    },
    mac_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FreeOrder',
    hooks: {
      async beforeCreate (instance) {
        try {
          const mac = await macaddress.one()
          instance.mac_address = mac
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
  return FreeOrder;
};