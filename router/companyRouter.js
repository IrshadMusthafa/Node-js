const {
    addCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
  } = require('../Controller/companyController');
  const express = require('express');
  const router = express.Router();
  
  router.route('/').post(addCompany).get(getAllCompanies);

  router.route('/:id').put(updateCompany);
  router.route('/:auth_id/:id').delete(deleteCompany);
  module.exports = router;
  
