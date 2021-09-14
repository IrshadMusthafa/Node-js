const db = require('../models');
const jwt = require('jsonwebtoken');

/*********** Add Unit ***************/
exports.addCommunityRequest = (req, res) => {
  const added_by = req.body.auth_userid;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  db.communityRequest
    .create({
      request_ip: req.ip,
     request_name: req.body.request_name,
     request_email:req.body.request_email,
     request_address1: req.body.request_address1,
     request_address2: req.body.request_address2,
     request_pincode: req.body.request_pincode,
     request_city: req.body.request_city,
     request_state_id: req.body.request_state_id,
      createdBy: added_by,
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'New Communityrequest ID: ' + result.request_id + ' has been added by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'New CommunityRequest',
        activity_user: user_name,
        activity_user_id: added_by,
        activity_desc: activity,
      });

      db.communityRequest
        .findAll({
          where: { request_status: 0 },
          where: { request_id: result.request_id },
          order: [['request_id', 'DESC']],
          attributes: [
            'request_id',           
            'request_name',
            'request_email',
            'request_address1',
            'request_address2',
            'request_pincode',
            'request_city',
            'request_state_id',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((communityrequests) => {
          res.send({ data: communityrequests });
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

exports.getAllRequests = (req, res) => {
    console.log("hii");
  var request_id = req.query.id;
  if (request_id) {
    db.communityRequest
      .findOne({
        where: { request_id: request_id },
        attributes: ['request_id', 'request_name','request_email','request_address1', 'request_address2','request_pincode', 'request_city','request_state_id'],
        order: [['request_id', 'DESC']],
      })
      .then((communityRequest) => {
        if (communityRequest) {
          return res.status(200).send({ response: 'success', result: communityRequest });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'request not found' });
        }
      });
  } else {
    db.communityRequest
      .findAll({
        where: { request_status: 0 },
        order: [['request_id', 'DESC']],
        attributes: [
            'request_id',           
            'request_name',
            'request_email',
            'request_address1',
            'request_address2',
            'request_pincode',
            'request_city',
            'request_state_id',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
        ],
      })
      .then((requests) => {
        res.send({ data: requests });
      });
  }
};

/*********** Update Unit ***************/

exports.updateCommunityRequest = (req, res) => {
  var edited_by = req.body.auth_userid;
  console.log(req);
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var request_id = req.params.id;
  db.communityRequest
    .findOne({
      where: { request_id: request_id },
      attributes: [
        'request_id',           
        'request_name',
        'request_email',
        'request_address1',
        'request_address2',
        'request_pincode',
        'request_city',
        'request_state_id',
      ],
    })
    .then((communityRequestInfo) => {
      if (communityRequestInfo) {
        communityRequestInfo.request_ip = req.ip;
        communityRequestInfo.request_name = req.body.request_name;
        communityRequestInfo.request_email = req.body.request_email;
        communityRequestInfo.request_address1 = req.body.request_address1;
        communityRequestInfo.request_address2 = req.body.request_address2;
        communityRequestInfo.request_pincode = req.body.request_pincode;
        communityRequestInfo.request_city = req.body.request_city;
        communityRequestInfo.request_state_id= req.body.request_state_id;
        communityRequestInfo.updatedBy = edited_by;
        return communityRequestInfo.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'CommunityRequest not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Communityrequest ID: ' + result.request_id + ' has been updated by ' + user_name;
      db.userLog.create({
        activity_ip: ip,
        activity_action: 'Edit Community Request',
        activity_user: user_name,
        activity_user_id: edited_by,
        activity_desc: activity,
      });
      db.communityRequest
        .findAll({
          where: { request_status: 0 },
          where: { request_id: result.request_id },
          order: [['request_id', 'DESC']],
          attributes: [
            'request_id',           
            'request_name',
            'request_email',
            'request_address1',
            'request_address2',
            'request_pincode',
            'request_city',
            'request_state_id',
          ],
          include: [
            {
              model: db.User,
              attributes: ['id', 'fname', 'lname'],
              as: 'User',
            },
          ],
        })
        .then((communityrequests) => {
          res.send({ data: communityrequests });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
    });
};

/************* Delete Unit *********/
exports.deleteCommunityRequest = (req, res) => {
  var edited_by = req.params.auth_id;
  //select user's details
  var user_name = '';
  db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
    user_name = userInfo.fname + ' ' + userInfo.lname;
  });

  var request_id = req.params.id;
  db.communityRequest
    .findOne({ where: { request_id: request_id } })
    .then((communityRequest) => {
      if (communityRequest) {
        communityRequest.request_status = 1;
        communityRequest.request_ip = req.ip;
        communityRequest.updatedBy = edited_by;
        return communityRequest.save();
      } else {
        return res
          .status(200)
          .send({ response: 'failure', result: 'Unit not found' });
      }
    })
    .then((result) => {
      var ip = req.ip;
      var activity =
        'Unit ID: ' + result.unit_id + ' has been deleted by ' + user_name;
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