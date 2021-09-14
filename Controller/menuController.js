const MainMenuTable = require('../models').MainMenuTable;
const SubMenuTable = require('../models').SubMenuTable;

exports.getMenuOptions = (req, res) => {
  MainMenuTable.findAll({
    include: [
      {
        model: SubMenuTable,
        attributes: ['sub_name', 'sub_link', 'sub_icon'],
        order: [['sub_order', 'desc']],
      },
    ],
    attributes: ['main_menuname', 'main_link', 'main_icon'],
    order: [['menu_order', 'asc']],
    where: { main_status: 0 },
  })

    .then(function (result) {
      res.send({ error: false, message: 'submenu list', data: result });
    })
    .catch(function (err) {
      res.send({
        error: true,
        message: 'menu list',
        data: err,
      });
    });
};
