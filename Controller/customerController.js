const db = require('../models');
const jwt = require('jsonwebtoken');


/*********** Add Order ***************/
exports.addCustomer = (req, res) => {
  const added_by = req.body.auth_userid;
  console.log(req.body);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  db.customer
    .create({
      customer_ip: req.ip,
      customer_name: req.body.customer_name,
      customer_mob: req.body.customer_mob,
      customer_email: req.body.customer_email,
      customer_apartment_no: req.body.customer_apartment_no,
      customer_status: 0,
      createdBy: added_by,
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'New customer ID: ' + result.customer_id + ' has been added by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'New Customer',
        activity_user: user_name,
        activity_user_id: added_by,
        activity_desc: activity,
      });

      db.customer
        .findAll({
          where: { customer_status: 0, customer_id: result.customer_id },

          order: [['customer_id', 'DESC']],
          attributes: [

            'customer_name',
            'customer_mob',
            'customer_email',
            'customer_apartment_no',
            'customer_status',
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
        .then((customers) => {
          res.send({ data: customers });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error ' + err, response: 'Error' });
    });
};

/*********** View All Unit / Single Unit ***************/




/*********** View All customer / Single customer ***************/

exports.getAllCustomers = (req, res) => {
  var customer_id = req.query.id;
  if (customer_id) {
    db.customer
      .findOne({
        where: { customer_id: customer_id },
        attributes: ['customer_id', 'customer_name', 'customer_mob', 'customer_email', 'customer_apartment_no'],
        order: [['customer_id', 'DESC']],
      })
      .then((customer) => {
        if (customer) {
          return res.status(200).send({ response: 'success', result: customer });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'customer not found' });
        }
      });
  } else {
    db.customer
      .findAll({
        where: { customer_status: 0 },
        order: [['customer_id', 'DESC']],
        attributes: [
          'customer_id', 'customer_name', 'customer_mob', 'customer_email', 'customer_apartment_no'
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },

        ],
      })
      .then((customers) => {
        res.send({ data: customers });
      });
  }
};


/************* Delete Order *********/
exports.deleteCustomer = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var customer_id = req.params.id;
  db.customer
    .findOne({ where: { customer_id: customer_id } })
    .then((customer) => {
      if (customer) {
        customer.customer_status = 1;
        customer.customer_ip = req.ip;
        customer.updatedBy = edited_by;
        return customer.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'customer not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'customer ID: ' + result.customer_id + ' has been deleted by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete customer',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};


/*********** Update controller ***************/

exports.updateCustomer = (req, res) => {
  var edited_by = req.body.auth_userid;
  console.log(req);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var customer_id = req.params.id;
  db.customer
    .findOne({
      where: { customer_id: customer_id },
      attributes: [
        'customer_ip',
        'customer_name',
        'customer_mob',
        'customer_email',
        'customer_apartment_no',
        'customer_status',
        'createdBy',
      ],
    })
    .then((customerInfo) => {
      if (customerInfo) {
        customerInfo.customer_ip = req.ip;
        customerInfo.customer_name = req.body.customer_name;
        customerInfo.customer_mob = req.body.customer_mob;
        customerInfo.customer_email = req.body.customer_email;
        customerInfo.customer_apartment_no = req.body.customer_apartment_no;
        customerInfo.updatedBy = edited_by;
        return customerInfo.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'customer not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'customer ID: ' + result.customer_id + ' has been updated by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Edit customer',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      db.customer
        .findAll({
          where: { customer_status: 0, customer_id: result.customer_id },

          order: [['customer_id', 'DESC']],
          attributes: [
            'customer_ip',
            'customer_name',
            'customer_mob',
            'customer_email',
            'customer_apartment_no',
            

          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((customers) => {
          res.send({ data: customers });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    });
};

exports.getCustomerOptions = (req, res) => {
  db.customer.findAll({
    attributes: ['customer_id', 'customer_name'],
    order: [['customer_id', 'asc']],
  })
    .then(function (customers) {
      res.send({ error: false, message: 'customer list', data: customers });
    })
    .catch(function (err) {
      res.send({
        error: true,
        message: 'customers list',
        data: 'Something went wrong',
      });
    });
};