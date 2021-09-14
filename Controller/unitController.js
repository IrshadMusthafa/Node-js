const db = require('../models');
const jwt = require('jsonwebtoken');

/*********** Add Unit ***************/
exports.addUnit = (req, res) => {
  const added_by = req.body.auth_userid;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  db.unit
    .create({
      unit_ip: req.ip,
      default_unit: req.body.default_unit,
      product_sub_unit: req.body.product_sub_unit,
      sub_unit_value: req.body.sub_unit_value,
      createdBy: added_by,
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'New Unit ID: ' + result.unit_id + ' has been added by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'New Unit',
        activity_user: user_name,
        activity_user_id: added_by,
        activity_desc: activity,
      });

      db.unit
        .findAll({
          where: { unit_status: 0 },
          where: { unit_id: result.unit_id },
          order: [['unit_id', 'DESC']],
          attributes: [
            'unit_id',
            'default_unit',
            'product_sub_unit',
            'sub_unit_value',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((units) => {
          res.send({ data: units });
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

exports.getAllUnits = (req, res) => {
  var unit_id = req.query.id;
  if (unit_id) {
    db.unit
      .findOne({
        where: { unit_id: unit_id },
        attributes: ['unit_id', 'unit_name', 'unit_shortcode'],
        order: [['unit_id', 'DESC']],
      })
      .then((unit) => {
        if (unit) {
          return res.status(200).send({ response: 'success', result: unit });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Unit not found' });
        }
      });
  } else {
    db.unit
      .findAll({
        where: { unit_status: 0 },
        order: [['unit_id', 'DESC']],
        attributes: [
          'unit_id',
          'default_unit',
          'product_sub_unit',
          'sub_unit_value',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
        ],
      })
      .then((units) => {
        res.send({ data: units });
      });
  }
};

/*********** Update Unit ***************/

exports.updateUnit = (req, res) => {
  var edited_by = req.body.auth_userid;
  console.log(req);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var unit_id = req.params.id;
  db.unit
    .findOne({
      where: { unit_id: unit_id },
      attributes: [
        'unit_id',
        'default_unit',
        'product_sub_unit',
        'sub_unit_value',
      ],
    })
    .then((unitInfo) => {
      if (unitInfo) {
        unitInfo.unit_ip = req.ip;
        unitInfo.default_unit = req.body.default_unit;
        unitInfo.product_sub_unit = req.body.product_sub_unit;
        unitInfo.sub_unit_value = req.body.sub_unit_value;
        unitInfo.updatedBy = edited_by;
        return unitInfo.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Unit not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Unit ID: ' + result.unit_id + ' has been updated by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Edit Unit',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      db.unit
        .findAll({
          where: { unit_status: 0 },
          where: { unit_id: result.unit_id },
          order: [['unit_id', 'DESC']],
          attributes: [
            'unit_id',
            'default_unit',
            'product_sub_unit',
            'sub_unit_value',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((units) => {
          res.send({ data: units });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    });
};

/************* Delete Unit *********/
exports.deleteUnit = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var unit_id = req.params.id;
  db.unit
    .findOne({ where: { unit_id: unit_id } })
    .then((unit) => {
      if (unit) {
        unit.unit_status = 1;
        unit.unit_ip = req.ip;
        unit.updatedBy = edited_by;
        return unit.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Unit not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Communityrequest ID: ' + result.unit_id + ' has been deleted by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Delete Unit',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      return res
        .status(200)
        .send({ response: 'success', message: 'Deleted successfully' });
    });
};
