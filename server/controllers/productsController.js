const db = require('../../db/db.js');
const { models } = require('../../db/db');

const productsController = {};

productsController.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await models.Product.findAll();
    res.locals.products = allProducts;
    return next();
  } catch (error) {
    return next({
      log: `productsController.getAllProducts: ERROR: Error while getting all products. ${error}`,
      message: {
        err:
          'Error occurred in productController.getAllProducts. Check server logs for more details.',
      },
    });
  }
};

// create new controller, adding a new product to product table
productsController.addProduct = async (req, res, next) => {
  const { name, description, pictureurl, price, farm_id } = req.body;

  try {
    const newProduct = await models.Product.create({
      name,
      description,
      pictureurl,
      price,
      farm_id,
    });
    res.locals.newProduct = newProduct;
    return next();
  } catch (error) {
    return next({
      log: `productsController.addProduct: ERROR: Error creating new product.${error}`,
      message: {
        err:
          'Error occurred in productsController.addProduct. Check server logs for more details.',
      },
    });
  }
};

module.exports = productsController;
