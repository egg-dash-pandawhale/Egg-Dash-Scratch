const db = require('../../db/db.js');
const { models } = require('../../db/db');

const custController = {};

// new customer signs up
custController.createUser = async (req, res, next) => {
  // const { email, password } = req.body;
  const {
    first_name,
    last_name,
    email,
    password,
    address_number,
    address_street,
    address_zip,
  } = req.body;

  try {
    const newUser = await models.User.create({
      first_name,
      last_name,
      email,
      password,
      address_number,
      address_street,
      address_zip,
    });

    return next();
  } catch (error) {
    return next({
      log: `custController.createUser: ERROR: Error creating new user.${error}`,
      message: {
        err:
          'Error occurred in custController.createUser. Check server logs for more details.',
      },
    });
  }
};

// customer signs in and cart loads 'get' request
custController.verifyCust = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const user = await models.User.findOne({ where: { email: email } });

    if (!user) {
      return next({
        log: `custController.verifyCust: ERROR: Error getting the customer's information from the database.`,
        message: {
          err: 'Wrong username or password!',
        },
      });
    }

    if (user.dataValues.password !== password) {
      return next({
        log: `custController.verifyCust: ERROR: Error getting the customer's information from the database.`,
        message: {
          err: 'Wrong username or password!',
        },
      });
    }

    const responseObj = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      address_number: user.address_number,
      address_street: user.address_street,
      address_zip: user.address_zip,
    };

    res.locals.user = responseObj;

    return next();
  } catch (error) {
    return next({
      log: `custController.verifyCust: ERROR: Error getting the customer's information from the database.${error}`,
      message: {
        err:
          'Error occurred in custController.verifyCust. Check server logs for more details.',
      },
    });
  }
};

module.exports = custController;
