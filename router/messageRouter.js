const {
    
    getAllMessages,
  } = require('../Controller/messageControler');
  const express = require('express');
  const router = express.Router();
  router.route('/').get(getAllMessages);
  module.exports = router;
  
