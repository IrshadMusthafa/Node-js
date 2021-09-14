const db = require('../models');
const jwt = require('jsonwebtoken');




/*********** Add Tax ***************/
exports.addTax = (req, res) => {
  const added_by = req.body.auth_userid;
  console.log(req.body);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  db.tax
    .create({
      tax_slab_ip: req.ip,
      tax_slab_type: req.body.tax_slab_type,
      tax_slab_name: req.body.tax_slab_name,
      tax_slab_percentage: req.body.tax_slab_percentage,
      tax_slab_status:0,
      createdBy: added_by,
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'New Tax ID: ' + result.tax_slab_id + ' has been added by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'New Tax',
        activity_user: user_name,
        activity_user_id: added_by,
        activity_desc: activity,
      });

      db.tax
        .findAll({
          where: { tax_slab_status: 0 },
          where: { tax_slab_id: result.tax_slab_id },
          order: [['tax_slab_id', 'DESC']],
          attributes: [
            'tax_slab_id',
            'tax_slab_type',
            'tax_slab_name',
            'tax_slab_percentage',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((taxes) => {
          res.send({ data: taxes });
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

exports.getAllTax = (req, res) => {
  var tax_slab_id = req.query.id;
  if (tax_slab_id) {
    db.tax
      .findOne({
        where: { tax_slab_id: tax_slab_id },
        attributes: ['tax_slab_id','tax_slab_type','tax_slab_name','tax_slab_percentage','tax_slab_time'],
        order: [['tax_slab_id', 'DESC']],
      })
      .then((tax) => {
        if (tax) {
          return res.status(200).send({ response: 'success', result: tax });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'tax not found' });
        }
        

      });
  } else {
    db.tax
      .findAll({
        where: { tax_slab_status: 0 },
        order: [['tax_slab_id', 'DESC']],
        attributes: [
            'tax_slab_id','tax_slab_type','tax_slab_name','tax_slab_percentage','tax_slab_time'
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
        ],
      })
      .then((taxes) => {
        res.send({ data: taxes });
        
      });
  }
};
/*********** Update Unit ***************/

exports.updateTax = (req, res) => {
  var edited_by = req.body.auth_userid;
  console.log(req);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var tax_slab_id = req.params.id;
  db.tax
    .findOne({
      where: { tax_slab_id: tax_slab_id },
      attributes: [
        'tax_slab_id',
        'tax_slab_type',
        'tax_slab_name',
        'tax_slab_percentage',
      ],
    })
    .then((taxInfo) => {
      if (taxInfo) {
        taxInfo.tax_slab_ip = req.ip;
        taxInfo.tax_slab_type = req.body.tax_slab_type;
        taxInfo.tax_slab_name = req.body.tax_slab_name;
        taxInfo.tax_slab_percentage = req.body.tax_slab_percentage;
        taxInfo.updatedBy = edited_by;
        return taxInfo.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Tax not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Tax ID: ' + result.tax_slab_id + ' has been updated by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Edit tax',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      db.tax
        .findAll({
          where: { tax_slab_status: 0 },
          where: { tax_slab_id: result.tax_slab_id },
          order: [['tax_slab_id', 'DESC']],
          attributes: [
            'tax_slab_id',
        'tax_slab_type',
        'tax_slab_name',
        'tax_slab_percentage',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((taxes) => {
          res.send({ data: taxes });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    });
};

/************* Delete Tax *********/
exports.deleteTax = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var tax_slab_id = req.params.id;
  db.tax
    .findOne({ where: { tax_slab_id: tax_slab_id } })
    .then((tax) => {
      if (tax) {
        tax.tax_slab_status = 1;
        tax.tax_slab_ip = req.ip;
        tax.updatedBy = edited_by;
        return tax.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Tax not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Tax ID: ' + result.tax_slab_id + ' has been deleted by ' + user_name;
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
