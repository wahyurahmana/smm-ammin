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
    ServiceId: DataTypes.INTEGER,
    link: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    mac_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FreeOrder',
    hooks: {
      beforeCreate(instance) {
        macaddress.one()
          .then((mac) => {
            instance.mac_address = mac
          }).catch((err) => {
            console.log(err);
          });
      }
    }
  });
  return FreeOrder;
};