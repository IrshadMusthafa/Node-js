const db = require('../models');
const jwt = require('jsonwebtoken');


/*********** View All Unit / Single Unit ***************/

exports.getAllMessages = (req, res) => {
  var msg_id = req.query.id;
  if (msg_id) {
    db.message
      .findOne({
        where: { msg_id: msg_id },
        attributes: ['msg_id','message_type','message_datetime','message_from','message_to','message_title','message_log'],
        order: [['msg_id', 'DESC']],
      })
      .then((message) => {
        if (message) {
          return res.status(200).send({ response: 'success', result: message });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'message not found' });
        }
      });
  } else {
    db.message
      .findAll({
        where: { msg_status: 0 },
        
        order: [['msg_id', 'DESC']],
        attributes: [
            'msg_id','message_type','message_datetime','message_from','message_to','message_title','message_log'        ],
        include: [
        //   { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
        //   { model: db.customer, attributes: ['customer_name'], as: 'customer' },
        //   { model: db.product, attributes: ['product_name_english'], as: 'product' },

        ],
      })
      .then((message) => {
        res.send({ data: message });
      });
  }
};