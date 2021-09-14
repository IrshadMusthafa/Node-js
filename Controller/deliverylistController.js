// const db = require('../models');
// const jwt = require('jsonwebtoken');


// /*********** View All Unit / Single Unit ***************/

// exports.getAllDeliverylists = (req, res) => {
//   var o_id = req.query.id;
//   if (o_id) {
//     db.deliverylist
//       .findOne({
//         where: { o_id: o_id },
//         attributes: ['o_id', 'o_number','o_customer_id','o_customer_apartment_no','o_date',],
//         order: [['o_id', 'DESC']],
//       })
//       .then((deliverylist) => {
//         if (deliverylist) {
//           return res.status(200).send({ response: 'success', result: deliverylist });
//         } else {
//           return res
//             .status(200)
//             .send({ response: 'failure', result: 'order not found' });
//         }
//       });
//   } else {
//     db.deliverylist
//       .findAll({
//         where: { o_approved_status: 0 },
//         order: [['o_id', 'DESC']],
//         attributes: [
//             'o_id', 'o_number','o_customer_id','o_customer_apartment_no','o_date',
//         ],
//         include: [
//           { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
//           { model: db.customer, attributes: ['customer_name','customer_mob'], as: 'customer' },
//           { model: db.Community, attributes: ['community_address1','community_address2'], as:'Community' },

//         ],
//       })
//       .then((deliverylist) => {
//         res.send({ data: deliverylist });
//       });
//   }
// };

const db = require('../models');
const jwt = require('jsonwebtoken');


/*********** View All Unit / Single Unit ***************/

exports.getAllDeliverylists = (req, res) => {
  var o_id = req.query.id;
  if (o_id) {
    db.deliverylist
      .findOne({
        where: { o_id: o_id },
        attributes: ['o_id', 'o_number','o_customer_id','o_customer_apartment_no','o_date',],
        order: [['o_id', 'DESC']],
      })
      .then((deliverylist) => {
        if (deliverylist) {
          return res.status(200).send({ response: 'success', result: deliverylist });
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'order not found' });
        }
      });
  } else {
    db.deliverylist
      .findAll({
        where: { o_approved_status: 1 , o_status: 0},
        order: [['o_id', 'DESC']],
        attributes: [
            'o_id', 'o_number','o_customer_id','o_customer_apartment_no','o_date',
        ],
        include: [
          { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
          { model: db.customer, attributes: ['customer_name','customer_mob'], as: 'customer' },
          

        ],
      })
      .then((deliverylist) => {
        res.send({ data: deliverylist });
      });
  }
};