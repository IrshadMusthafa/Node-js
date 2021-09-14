const { getAllBanner, deleteBanner } = require('../Controller/bannerController');
  const express = require('express');
  const router = express.Router();
//   router.post('/', uploadFile.single('file'), addBrand);
  router.route('/').get(getAllBanner);
//   router.route('/:id').put(updateBrand);
  router.route('/:auth_id/:id').delete(deleteBanner);
  module.exports = router;