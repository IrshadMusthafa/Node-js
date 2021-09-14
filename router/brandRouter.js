const {
    addBrand,
    uploadFile,
    getAllBrands,
    updateBrand,
    deleteBrand,
    
    changeStatusBrand,
    // categoryOptions
  } = require('../Controller/brandController');
  const express = require('express');
  const router = express.Router();
  router.post('/', uploadFile.single('file'), addBrand);
  router.route('/').get(getAllBrands);
  router.route('/:id').put(updateBrand);
  router.route('/:auth_id/:id').delete(deleteBrand);
  router.route('/change_status/:auth_id/:id').delete(changeStatusBrand);
//   router.route('/getOptions').get(categoryOptions);
  module.exports = router;