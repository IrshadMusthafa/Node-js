const express = require('express');
const {
  getPrivilegesOption,
  addPrivilege,
} = require('../Controller/privilegeController');
const router = express.Router();

router.route('/').get(getPrivilegesOption).post(addPrivilege);

module.exports = router;
