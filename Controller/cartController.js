const db = require('../models');
const jwt = require('jsonwebtoken');


/*********** View All Unit / Single Unit ***************/

exports.getAllCarts = (req, res) => {
  var cart_id = req.query.id;
  if (cart_id) {
    db.cart
      .findOne({
        where: { cart_id: cart_id },
        attributes: ['cart_id','cart_quantity'],
        order: [['cart_id', 'DESC']],
      })
      .then((cart) => {
        if (cart) {
          return res.status(200).send({ response: 'success', result: cart });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'cart not found' });
        }
      });
  } else {
    db.cart
      .findAll({
        where: { cart_status: 0 },
        where: { cart_id: req.params.id},
        order: [['cart_id', 'DESC']],
        attributes: [
            'cart_id','cart_quantity'
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.customer, attributes: ['customer_name'], as: 'customer' },
          { model: db.product, attributes: ['product_name_english'], as: 'product' },

        ],
      })
      .then((cart) => {
        res.send({ data: cart });
      });
  }
};


/************* Delete Order *********/
exports.deleteCart = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var cart_id = req.params.id;
  db.cart
    .findOne({ where: { cart_id: cart_id } })
    .then((cart) => {
      if (cart) {
        cart.cart_status = 1;
        cart.cart_ip = req.ip;
        cart.updatedBy = edited_by;
        return cart.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'cart not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'cart ID: ' + result.cart_id + ' has been deleted by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete cart',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};
