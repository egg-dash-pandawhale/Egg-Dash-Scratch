const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllProducts, (req, res) => {
  res.status(200).json([...res.locals.products]);
});

router.post('/', productsController.addProduct, (req, res) => {
  res.status(200).json({ newProduct: res.locals.newProduct });
});

module.exports = router;
