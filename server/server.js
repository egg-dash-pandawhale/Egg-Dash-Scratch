const express = require('express');
const path = require('path');

const app = express();

const custRouter = require('./routes/cust');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
// const User = require('../db/models/User');

// const f = async () => {
//   try {
//     await User.sync({force: true});
//     const jane = await User.create(
//       {first_name: "Jane",
//       last_name: "Doe",
//       email: "test@test.com",
//       password: "test",
//       address_number: 100,
//       address_street: "asd",
//       address_zip: 12345 });
//   } catch (error) {
//     console.log('FIND THE ERROR HERE!!!!!!!!!!!!', error);
//   }
// };
// f();

const port = 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router for customer logins
app.use('/cust', custRouter);

// router to access products
app.use('/products', productsRouter);

// router for shopping cart
app.use('/cart', cartRouter);

// serve index.html on the route '/'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

module.exports = app;
