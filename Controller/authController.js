const User = require('../models').User;
const {getHashedPassword} = require('./bcrypt.controller');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');


exports.registerUser = (req, res, next) => {
  const {
    user_email,
    username,
    mobile,
    password,
    fname,
    lname,
    previlage,
    user_division,
    user_company,
    user_branch,
    browser_token,
    status,
  } = req.body;

  User.create({
    user_email,
    username,
    mobile,
    password: password,
    fname,
    lname,
    previlage: 1,
    user_ip: '12345',
    user_company: 'srv',
    user_branch: 1,
    browser_token,
    status: '1',
    createdBy: '1',
  })
    .then((user) => {
      res.send({
        error: false,
        message: 'users list',
        data: user,
      });
      console.log('Created Product');
    })
    .catch((err) => {
      res.send({
        error: false,
        message: 'users list',
        data: err,
      });
    });
  // }
};

exports.loginUser = (req, res, next) => {
  if (JSON.stringify(req.body) == '{}') {
    return res.status(400).json({ Error: 'Login request body is empty' });
  }
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ Error: 'Missing fields for login' });
  }
  // search a user to login
  User.findOne({ where: { username: req.body.username } }) // searching a user with the same username and password sended in req.body
    .then(function (user) {
      if (user && user.validPassword(req.body.password, user.password)) {
        //return res.status(200).json({ message: "loged in!" }); // username and password match
        console.log('Logged In');

        var payload = { user: user.id };

        // create a token
        var token = jwt.sign(payload, 'jwtConfig.secret', {
          expiresIn: 30000,
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Wrong Username/Password, Please Check!',
          token: '',
        }); // if there is no user with specific fields send
      }
    })
    .catch(function (err) {
      console.error(err.stack);
      return res
        .status(500)
        .json({ success: false, message: 'Server Issue: ' + err, token: '' }); // server problems
    });
};

exports.getUsers = (req, res) => {
  User.findAll({
    attributes: {
      exclude: [
        'user_division',
        'user_company',
        'user_branch',
        'password',
        'ip',
        'createdAt',
        'updatedAt',
        'status',
        'browser_token',
      ],
    },

    limit: 10,
  })
    .then(function (users) {
      res.send({ error: false, message: 'users list', data: users });
    })
    .catch(function (err) {
      res.send({
        error: true,
        message: 'users list',
        data: 'something went wrong',
      });
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(400).json({ data: 'Something Went Wrong!!' });
    });
};
exports.updateUser = (req, res) => {
  const user_id = req.params.userId;
  const { id, user_email, username, mobile, fname, lname } = req.body;
  User.update(
    {
      user_email: user_email,
      username: username,
      mobile: mobile,
      fname: fname,
      lname: lname,
    },
    {
      where: { id: user_id },
    }
  )
    .then(function () {
      User.findByPk(user_id)
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          res.send({ data: err });
        });
    })
    .catch((err) => {
      res.send({ data: err });
    });
};

// exports.updateUser = (req, res) => {
//   const user_id = req.params.userId;
//   const { user_email, username, mobile, fname, lname } = req.body;
//   User.findAll({
//     where: {
//       id: user_id,
//     },
//     attributes: [
//       'user_email',
//       'username',
//       'mobile',
//       'mobile',
//       'fname',
//       'lname',
//     ],
//   })
//     .then((user) => {
//       user.user_email = user_email;
//       user.username = username;
//       user.mobile = mobile;
//       user.fname = fname;
//       user.lname = lname;
//       return user.save();
//     })
//     .then((result) => {
//       res.send({ data: result });
//     })
//     .catch((err) => {
//       res.status(400).json({ data: err, message: 'error' });
//     });
// };

// exports.updateUser = (req, res) => {
//   const user_id = req.params.userId;
//   const { id, user_email, username, mobile, fname, lname } = req.body;

//   User.findByPk(user_id)
//     .then((user) => {
//       user.user_email = user_email;
//       user.username= username;
//       user.mobile= mobile;
//       user.fname= fname;
//       user.lname= lname;
//       return user.save();
//     })
//     .then((result) => {
//       res.send({ data: result });
//     })
//     .catch((err) => {
//       res.status(400).json({ data: 'something went wrong', message: 'error' });
//     });
// };


exports.updatePassword = (req, res) => {
  const user_id = req.params.userId;
  const { password } = req.body;

  User.findByPk(user_id)
    .then((user) => {
      user.password = password;
      return user.save();
    })
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.status(400).json({ data: 'something went wrong', message: 'error' });
    });
};

  // exports.updateProduct = (req, res, next) => {
  //   const productId = req.params.productId;
  //   const updateTitle = req.body.title;
  //   const updateImageUrl = req.body.imageUrl;
  //   const updatePrice = req.body.price;
  //   const updateDescription = req.body.description;
  //   Product.findByPk(productId)
  //     .then((product) => {
  //       product.title = updateTitle;
  //       product.imageUrl = updateImageUrl;
  //       product.price = updatePrice;
  //       product.description = updateDescription;
  //       return product.save();
  //     })
  //     .then((result) => {
  //       res.send(result);
  //     })
  //     .catch((err) => {
  //       res.status(400).json({ message: 'error' });
  //     });
  // };
  exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    User.findByPk(userId)
      .then((user) => {
        return user.destroy();
      })
      .then((result) => {
        console.log('Record Deleted');
        res.send({ data: result });
      })
      .catch((err) => res.send({ data: 'Something Went Wrong' }));
  };