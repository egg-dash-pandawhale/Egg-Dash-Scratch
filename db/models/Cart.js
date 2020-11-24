// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const User = require('./User');

const cart = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // customer_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // product_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };

  return Cart;
};

module.exports = cart;
