// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const Cart = require('./Cart');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address_street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Cart);
  }

  return User;
}

module.exports = user;