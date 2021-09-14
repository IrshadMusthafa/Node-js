const {
    // addUnit,
    getAllCarts,
    // updateUnit,
    deleteCart,
  } = require('../Controller/cartController');
  const express = require('express');
  const router = express.Router();
  router.route('/').get(getAllCarts);
//   router.route('/:id').put(updateUnit);
  router.route('/:auth_id/:id').delete(deleteCart);
  module.exports = router;
  
