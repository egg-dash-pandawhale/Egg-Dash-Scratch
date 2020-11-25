const db = require('../../db/db.js');
const { models } = require('../../db/db');

const cartController = {};

// user signs in and cart loads 'get' request
cartController.getUserCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    // go through the cart table and find all rows where the UserId column
    // matches the id on the request body
    const userCart = await models.Cart.findAll({
      where: {
        UserId: id,
      },
      // this joins the Product table with the Cart table
      include: [
        {
          model: models.Product,
        },
      ],
    });
    res.locals.userCart = userCart;
    return next();
  } catch (error) {
    return next({
      log: `cartController.getUserCart: ERROR: Error adding product to cart. ${error}`,
      message: {
        err:
          'Error occurred in cartController.getUserCart. Check server logs for more details.',
      },
    });
  }
};

// user adds item to cart = 'post' request
cartController.updateUserCart = async (req, res, next) => {
  const { customer_id, product_id, quantity } = req.body;
  const UserId = customer_id;
  const ProductId = product_id;
  // check if product is already in the cart, i.e., the row should just be updated
  // if so, just update the quantity
  // if not, create a new row on the table

  try {
    // find  row in the carts table
    // if we do find one, we update it with .update()
    // if we don't find one, create a new row

    const item = await models.Cart.findOne({
      where: {
        UserId,
        ProductId,
      },
    });
    // if we don't find the item in the Cart table, insert it into the table
    if (!item) {
      const newlyAddedItem = await models.Cart.create({
        UserId,
        ProductId,
        quantity,
      });
    } else if (quantity > 0) {
      // otherwise, update the row with the new quantity from the request body
      const updatedItem = await models.Cart.update(
        { quantity },
        {
          where: {
            UserId,
            ProductId,
          },
          returning: true,
        }
      );
      // uncomment the line below to see the updated item
      // console.log(updatedItem[1][0].dataValues);
    } else {
      await models.Cart.destroy({
        where: {
          UserId,
          ProductId,
        },
      });
    }
    return next();
  } catch (error) {
    return next({
      log: `cartController.updateUserCart: ERROR: Error adding product to cart. ${error}`,
      message: {
        err:
          'Error occurred in cartController.updateUserCart. Check server logs for more details.',
      },
    });
  }
};

// user deletes item from cart - 'delete' request
cartController.deleteUserCart = async (req, res, next) => {
  const { customer_id } = req.body;
  const UserId = customer_id;

  try {
    await models.Cart.destroy({
      where: {
        UserId,
      },
    });
    return next();
  } catch (error) {
    return next({
      log: `cartController.deleteUserCart: ERROR: Error deleting all products from cart. ${error}`,
      message: {
        err:
          'Error occurred in cartController.deleteUserCart: Check server logs for more details.',
      },
    });
  }
};

module.exports = cartController;
