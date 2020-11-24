const express = require('express');

const router = express.Router();

const cartController = require('../controllers/cartController');

// user signs in and cart loads 'get' request

router.get('/', cartController.getUserCart, (req, res) => {
  res.status(200).json(res.locals.userCart);
});

// user updates item to cart - 'put' request
router.put('/', cartController.updateUserCart, (req, res) => {
  res.sendStatus(200);
});

// // user deletes all items from cart - 'delete' request
router.delete('/', cartController.deleteUserCart, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
