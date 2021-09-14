const {
    addTax,
    getAllTax,
    updateTax,
    deleteTax,
  } = require('../Controller/taxController');
  const express = require('express');
  const router = express.Router();
  
  router.route('/').post(addTax).get(getAllTax);

  router.route('/:id').put(updateTax);
  router.route('/:auth_id/:id').delete(deleteTax);
  module.exports = router;
  
