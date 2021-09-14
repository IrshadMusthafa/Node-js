const db = require('../models');
const jwt = require('jsonwebtoken');




/*********** Add Order ***************/
exports.addOrder = (req, res) => {
  const added_by = req.body.auth_userid;
  console.log(req.body.newValue.name);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  db.vieworder
    .create({
      o_ip: req.ip,
      o_from: req.body.o_from,
      o_branch_id: req.body.o_branch_id,
      o_number: req.body.o_number,
      o_date: req.body.o_date,
      o_time: req.body.o_time,
      o_payment_mode: req.body.o_payment_mode,
      o_pay_status: req.body.o_pay_status,
      o_customer_id: req.body.newValue._id,
      // customer_name:req.body.newValue.name,
      o_customer_apartment_no: req.body.o_customer_apartment_no,
      o_customer_mobile_no: req.body.o_customer_mobile_no,
      o_delivery_instructions: req.body.o_delivery_instructions,
      o_subtotal: req.body.o_subtotal,
      o_gst: req.body.o_gst,
      o_delivery_charge: req.body.o_delivery_charge,
      o_total: req.body.o_total,
      o_status: 0,
      createdBy: added_by,
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'New Order ID: ' + result.o_id + ' has been added by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'New Order',
        activity_user: user_name,
        activity_user_id: added_by,
        activity_desc: activity,
      });

      db.vieworder
        .findAll({
          where: { o_status: 0, o_id: result.o_id },

          order: [['o_id', 'DESC']],
          attributes: [
            'o_ip',
            'o_from',
            'o_branch_id',
            'o_number',
            'o_date',
            'o_time',
            'o_payment_mode',
            'o_pay_status',
            'o_customer_id',
            'o_customer_apartment_no',
            'o_customer_mobile_no',
            'o_delivery_instructions',
            'o_subtotal',
            'o_gst',
            'o_delivery_charge',
            'o_total',
            'o_status',
            'createdBy',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((orders) => {
          res.send({ data: orders });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error ' + err, response: 'Error' });
    });
};

/*********** View All order / Single Order ***************/

exports.getAllOrders = (req, res) => {
  var o_id = req.query.id;
  if (o_id) {
    db.vieworder
      .findOne({
        where: { o_id: o_id },
        attributes: ['o_id', 'o_number', 'o_date', 'o_from', 'o_total', 'o_delivery_charge', 'o_gst', 'o_subtotal', 'o_time'],
        order: [['o_id', 'DESC']],
      })
      .then((vieworder) => {
        if (vieworder) {
          return res.status(200).send({ response: 'success', result: vieworder });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'order not found' });
        }
      });
  } else {
    db.vieworder
      .findAll({
        where: { o_status: 0 },
        order: [['o_id', 'DESC']],
        attributes: [
          'o_id', 'o_number', 'o_date', 'o_from', 'o_total', 'o_delivery_charge', 'o_gst', 'o_subtotal', 'o_time'
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.customer, attributes: ['customer_name'], as: 'customer' },
          { model: db.customer, attributes: ['customer_mob'], as: 'customer' },

        ],
      })
      .then((orders) => {
        res.send({ data: orders });
      });
  }
};


/************* Delete Order *********/
exports.deleteOrder = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var o_id = req.params.id;
  db.vieworder
    .findOne({ where: { o_id: o_id } })
    .then((vieworder) => {
      if (vieworder) {
        vieworder.o_status = 1;
        vieworder.o_ip = req.ip;
        vieworder.updatedBy = edited_by;
        return vieworder.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Order not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Order ID: ' + result.o_id + ' has been deleted by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete Order',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};
