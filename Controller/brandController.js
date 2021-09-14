const db = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/svg+xml')) {
    cb(null, true);
  } else {
    res
      .status(500)
      .send({ message: 'Please upload only images', response: 'Error' });
    cb('Please upload only images.', false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/brand_icons/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-brand-icon-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

/*********** Add Category ***************/
const addBrand = async (req, res) => {
  try {
    // console.log(req);
    /*if (req.file == undefined) {
      res
        .status(500)
        .send({ message: 'Please select a file to upload', response: 'Error' });
    }*/
    const added_by = req.body.auth_userid;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
   

    db.brand
      .create({
        brand_ip: req.ip,
        brand_status: 0,
        brand_name_english: req.body.brand_name_english,
        brand_name_malayalam:req.body.brand_name_malayalam,
        brand_priority:req.body.brand_priority,
        brand_premium_status:req.body.brand_premium_status,
        // category_permalink :permalink,
       // category_icon_svg: fs.readFileSync(
        //  __basedir + '/uploads/category_icons/' + req.file.filename
       // ),
        brand_is_active: 0,
        createdBy: added_by,
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'New brand ID: ' +
          result.brand_id +
          ' has been added by ' +
          user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'New Category',
          activity_user: user_name,
          activity_user_id: added_by,
          activity_desc: activity,
        });

        db.brand
          .findAll({
            where: { brand_status: 0 },
            where: { brand_id: result.brand_id },
            order: [['brand_id', 'DESC']],
            attributes: [
              'brand_id',
              'brand_name_english',
              'brand_name_malayalam',
              'brand_priority',
              'brand_premium_status',
          'brand_is_active',
          
            ],
            include: [
              {
                model: db.User,
                attributes: ['id', 'fname', 'lname'],
                as: 'User',
              },
            ],
          })
          .then((brands) => {
            res.send({ data: brands });
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: 'Error ' + err, response: 'Error' });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error ' + err, response: 'Error' });
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        message: `Error when trying upload images: ${err}`,
        response: 'Error',
      });
  }
};

/*********** View All Category / Single Category ***************/

const getAllBrands = (req, res) => {
    var brand_id = req.query.id;
    if (brand_id) {
        db.brand
            .findOne({
                where: { brand_id: brand_id },
                attributes: [
                    'brand_id',
                    'brand_name_english',
                    'brand_name_malayalam',
                    'brand_is_active',
                    'brand_permalink',
                    'brand_image',
                    'web_banner_image',
                    'mobile_banner_image',
                    'brand_priority',
                    'brand_premium_status',
                ],
                order: [['brand_id', 'DESC']],
            })
            .then((brands) => {
                if (brands) {
                    return res
                        .status(200)
                        .send({ response: 'success', result: brands});
                } else {
                    return res
                        .status(200)
                        .send({ response: 'failure', result: 'Brand not found' });
                }
            });
    } else {
        db.brand
            .findAll({
                where: { brand_status: 0 },
                order: [['brand_id', 'DESC']],
                attributes: [
                    'brand_id',
                    'brand_name_english',
                    'brand_name_malayalam',
                    'brand_is_active',
                    // 'brand_permalink',
                    'brand_image',
                    'web_banner_image',
                    'mobile_banner_image',
                    'brand_priority',
                    'brand_premium_status',
                ],
                include: [
                    { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
                ],
            })
            .then((brands) => {
                res.send({ data: brands });
            });
    }
};

const updateBrand = async (req, res) => {
    var edited_by = req.body.auth_userid;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
  
    var brand_id = req.params.id;
    // var permalink = req.body.category_name;
    //   permalink=  permalink.replace(" ","-");
    //   permalink= permalink.replace(' ', '+');
    //   permalink=permalink.replace('+', '-');
    //   permalink=permalink.replace('.', '');
    //   permalink=permalink.replace(/[^a-zA-Z0-9-]/, '-');
    //   permalink=permalink.replace('----', '-');
    //   permalink=permalink.replace('---', '-');
    //   permalink=permalink.replace('--', '-');
    //   permalink=permalink.toLowerCase();
    //   permalink= permalink.trim("- ");
    //   var last_char = permalink.charAt(permalink.length-1);
    //   if(last_char=="-")
    //   {
    //     permalink = permalink.substring(0,permalink.length - 1);
    //   }
    db.brand
      .findOne({
        where: { category_id: category_id },
      })
      .then((brandInfo) => {
        if (brandInfo) {
          brandInfo.brand_ip = req.ip;
          brandInfo.brand_name_english= req.body.brand_name_english,
          brandInfo.updatedBy = edited_by;
          brandInfo.brand_name_malayalam=req.body.brand_name_malayalam;
          brandInfo.brand_priority=req.body.brand_priority;
          brandInfo.brand_premium_status=req.body.brand_premium_status;
        //   categoryInfo.category_permalink =permalink;
          return brandInfo.save();
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Brand not found' });
        }
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'Brand ID: ' + result.category_id + ' has been updated by ' + user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'Edit Category',
          activity_user: user_name,
          activity_user_id: edited_by,
          activity_desc: activity,
        });
        db.category
        .findAll({
          where: { brand_status: 0 },
          where: { brand_id: result.brand_id },
          order: [['brand_id', 'DESC']],
          attributes: [
            'brand_id',
            'brand_name_english',
            'brand_name_malayalam',
            'brand_is_active',
            'brand_priority',
            'brand_premium_status',
            'brand_image',
            'web_banner_image',
            'mobile_banner_image'
            
          ],
          include: [
            { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
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
  


/************* Delete brand *********/
const deleteBrand = async (req, res) => {
    var edited_by = req.params.auth_id;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
  
    var brd_id = req.params.id;
    db.brand
      .findOne({ where: { brand_id: brd_id } })
      .then((brand) => {
        if (brand) {
          brand.brand_status = 1;
          brand.brand_ip = req.ip;
          brand.updatedBy = edited_by;
          return brand.save();
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Brand not found' });
        }
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'brand ID: ' +
          result.brand_id +
          ' has been deleted by ' +
          user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'Delete Category',
          activity_user: user_name,
          activity_user_id: edited_by,
          activity_desc: activity,
        });
        return res
          .status(200)
          .send({ response: 'success', message: 'Deleted successfully' });
      });
  };
  /************* Delete brand *********/




// Status
const changeStatusBrand = async (req, res) => {
    var edited_by = req.params.auth_id;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
        user_name = userInfo.fname + ' ' + userInfo.lname;
    });

    var brd_id = req.params.id;
    db.brand
        .findOne({ where: { brand_id: brd_id } })
        .then((brand) => {
            if (brand) {
                if (brand.brand_is_active == 1) {
                    brand.brand_is_active = 0;
                } else {
                    brand.brand_is_active = 1;
                }

                brand.brand_ip = req.ip;
                brand.updatedBy = edited_by;
                return brand.save();
            } else {
                return res
                    .status(200)
                    .send({ response: 'failure', result: 'brand not found' });
            }
        })
        .then((result) => {
            var ip = req.ip;
            var activity =
                'Active status of Brand ID: ' +
                result.brand_id +
                ' has been edited by ' +
                user_name;
            db.userLog.create({
                activity_ip: ip,
                activity_action: 'Change Brand Active Status',
                activity_user: user_name,
                activity_user_id: edited_by,
                activity_desc: activity,
            });
            return res
                .status(200)
                .send({ response: 'success', message: 'Changed successfully' });
        });
};




module.exports = {
  uploadFile,
  addBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  changeStatusBrand,
//   categoryOptions
};