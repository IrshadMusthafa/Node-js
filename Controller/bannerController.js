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
    cb(null, __basedir + '/uploads/banner_icons/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-banner-icon-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });



/*********** View All Banner ***************/

const getAllBanner = (req, res) => {
    var banner_id = req.query.id;
    if (banner_id) {
        db.banner
            .findOne({
                where: { banner_id: banner_id },
                attributes: [
                    'banner_id',
                    'banner_type',
                    'banner_url',
                    'banner_name',
                    'banner_image',
                    'banner_image_app',
                    
                ],
                order: [['banner_id', 'DESC']],
            })
            .then((banners) => {
                if (banners) {
                    return res
                        .status(200)
                        .send({ response: 'success', result: banners});
                } else {
                    return res
                        .status(200)
                        .send({ response: 'failure', result: 'Banner not found' });
                }
            });
    } else {
        db.banner
            .findAll({
                where: { banner_status: 0 },
                order: [['banner_id', 'DESC']],
                attributes: [
                    'banner_id',
                    'banner_type',
                    'banner_url',
                    'banner_name',
                    'banner_image',
                    'banner_image_app',
                ],
                include: [
                    { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
                ],
            })
            .then((banners) => {
                res.send({ data: banners });
            });
    }
};

/************* Delete banner *********/
const deleteBanner = async (req, res) => {
    var edited_by = req.params.auth_id;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
      user_name = userInfo.fname + ' ' + userInfo.lname;
    });
  
    var bnr_id = req.params.id;
    db.banner
      .findOne({ where: { banner_id: bnr_id } })
      .then((banner) => {
        if (banner) {
          banner.banner_status = 1;
          banner.banner_ip = req.ip;
          banner.updatedBy = edited_by;
          return banner.save();
        } else {
          return res
            .status(200)
            .send({ response: 'failure', result: 'Banner not found' });
        }
      })
      .then((result) => {
        var ip = req.ip;
        var activity =
          'banner ID: ' +
          result.banner_id +
          ' has been deleted by ' +
          user_name;
        db.userLog.create({
          activity_ip: ip,
          activity_action: 'Delete Banner',
          activity_user: user_name,
          activity_user_id: edited_by,
          activity_desc: activity,
        });
        return res
          .status(200)
          .send({ response: 'success', message: 'Deleted successfully' });
      });
  };
  /************* Delete banner *********/



  
module.exports = {

    deleteBanner,
    getAllBanner,
    
  };