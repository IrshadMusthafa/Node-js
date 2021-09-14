const Privilege = require('../models').Privilege;

exports.addPrivilege = (req, res) => {
  const { privilege_name, privilege_code } = req.body;

  Privilege.create({
    privilege_name,
    privilege_code,
    status: 0,
  })
    .then((result) => {
      res.send({ data: result });
      console.log('Created Privilage');
    })
    .catch((err) => {
      res.send({ data: err });
    });
  // }
};

exports.getPrivilegesOption = (req, res) => {
  Privilege.findAll({
    where: {
      status: 0,
    },
    attributes: ['id', 'privilege_name'],
  })
    .then(function (privilege) {
      res.send({ error: false, message: 'privileges list', data: privilege });
    })
    .catch(function (err) {
      res.send({
        error: true,
        message: 'privileges list',
        data: 'Something went wrong',
      });
    });
};
