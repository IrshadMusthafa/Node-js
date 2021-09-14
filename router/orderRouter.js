const {
    addOrder,
    getAllOrders,
    // updateUnit,
    deleteOrder,
  } = require('../Controller/viewController');
  const express = require('express');
  const router = express.Router();
  router.route('/').get(getAllOrders);
  router.route('/').post(addOrder).get(getAllOrders);

//   router.route('/:id').put(updateUnit);
  router.route('/:auth_id/:id').delete(deleteOrder);
  
  module.exports = router;
  