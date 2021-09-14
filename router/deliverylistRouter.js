const {
    // addUnit,
    getAllDeliverylists
    // updateUnit,
    
  } = require('../Controller/deliverylistController');
  const express = require('express');
  const router = express.Router();
  router.route('/').get(getAllDeliverylists);
//   router.route('/:id').put(updateUnit);
//   router.route('/:auth_id/:id').delete(deleteOrder);
  
  module.exports = router;
  