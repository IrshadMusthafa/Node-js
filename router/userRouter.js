const express = require('express');
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  updatePassword,
} = require('../Controller/authController');
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/lists').get(getUsers);
router.route('/').post(registerUser);
router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);
router.route('password/:userId').put(updatePassword);

module.exports = router;
