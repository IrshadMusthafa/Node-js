const {
    addCommunityRequest,
    getAllRequests,
    updateCommunityRequest,
    deleteCommunityRequest,
  } = require('../Controller/communityRequestController');
  const express = require('express');
  const router = express.Router();
  router.route('/').post(addCommunityRequest).get(getAllRequests);
  router.route('/:id').put(updateCommunityRequest);
  router.route('/:auth_id/:o_id').delete(deleteCommunityRequest);
  
  module.exports = router;
  