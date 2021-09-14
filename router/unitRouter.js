const {
  addUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
} = require('../Controller/unitController');
const express = require('express');
const router = express.Router();
router.route('/').post(addUnit).get(getAllUnits);
router.route('/:id').put(updateUnit);
router.route('/:auth_id/:id').delete(deleteUnit);

module.exports = router;
