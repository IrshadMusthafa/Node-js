const express = require('express');
const { getMenuOptions } = require('../Controller/menuController');
const router = express.Router();

router.route('/').get(getMenuOptions);

module.exports = router;
