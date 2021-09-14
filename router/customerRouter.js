const {
    addCustomer,
    getAllCustomers,
    deleteCustomer,
    updateCustomer,
    getCustomerOptions 
  } = require('../Controller/customerController');
  const express = require('express');
  const router = express.Router();
  router.route('/').post(addCustomer).get(getAllCustomers);
  router.route('/:id').put(updateCustomer);
  router.route('/:auth_id/:id').delete(deleteCustomer);
  router.route('/getOptions').get(getCustomerOptions);
  module.exports = router;
  
