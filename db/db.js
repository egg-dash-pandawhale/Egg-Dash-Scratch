const Sequelize = require('sequelize');
const user = require('./models/User');
const cart = require('./models/Cart');
const product = require('./models/Product');

const PG_URI =
  'postgres://ifodztro:kx-XAz8N70wNlxhnkewL4sdA2-l5ALMR@suleiman.db.elephantsql.com:5432/ifodztro';

const instance = new Sequelize(PG_URI);

const models = {
  User: user(instance, Sequelize),
  Cart: cart(instance, Sequelize),
  Product: product(instance, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { instance, models };
