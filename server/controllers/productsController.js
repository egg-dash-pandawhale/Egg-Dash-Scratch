const db = require('../../db/db.js');
const { models } = require('../../db/db');

const productsController = {};

productsController.getAllProducts = (req, res, next) => {
  const getProducts = `SELECT * FROM products`;

  db.query(getProducts)
    .then((data) => {
      console.log('this is the data from the products table ', data.rows);
      res.locals.products = data.rows;
    })
    .then(next)
    .catch(() => {
      next({
        log: `productsController.createUser: ERROR: Error pulling data from the DB.`,
        message: {
          err:
            'Error occurred in productController.getAllProducts. Check server logs for more details.',
        },
      });
    });
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
