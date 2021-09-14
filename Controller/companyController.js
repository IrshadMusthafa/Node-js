const db = require('../models');
const jwt = require('jsonwebtoken');




/*********** Add Company ***************/
exports.addCompany = (req, res) => {
    const added_by = req.body.auth_userid;
    console.log(req.body);
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: added_by } }).then((userInfo) => {
        user_name = userInfo.fname + ' ' + userInfo.lname;
    });

    db.Company
        .create({
            company_ip: req.ip,
            company_unqid: req.body.company_unqid,
            company_name: req.body.company_name,
            company_shortcode: req.body.company_shortcode,
            company_person: req.body.company_person,
            company_design: req.body.company_design,
            company_mob: req.body.company_mob,
            company_land: req.body.company_land,
            company_email: req.body.company_email,
            company_web: req.body.company_web,
            company_address: req.body.company_address,
            company_district: req.body.company_district,
            company_state: req.body.company_state,
            company_pin: req.body.company_pin,
            company_gstin: req.body.company_gstin,
            company_pan: req.body.company_pan,
            company_tds: req.body.company_tds,
            company_logo: req.body.company_logo,
            company_latitude: req.body.company_latitude,
            company_longitude: req.body.company_longitude,
            company_status: 0,
            createdBy: added_by,
        })
        .then((result) => {
            var ip = req.ip;
            var activity =
                'New Company ID: ' + result.company_id + ' has been added by ' + user_name;
            db.userLog.create({
                activity_ip: ip,
                activity_action: 'New Company',
                activity_user: user_name,
                activity_user_id: added_by,
                activity_desc: activity,
            });

            db.Company
                .findAll({
                    where: { company_status: 0, company_id: result.company_id },

                    order: [['company_id', 'DESC']],
                    attributes: [
                        'company_id',
                        'company_ip',
                        'company_unqid',
                        'company_name',
                        'company_shortcode',
                        'company_person',
                        'company_mob',
                        'company_district',

                    ],
                    include: [
                        {
                            model: db.User,
                            attributes: ['id', 'fname', 'lname'],
                            as: 'User',
                        },
                    ],
                })
                .then((companies) => {
                    res.send({ data: companies });
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Error ' + err, response: 'Error' });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Error ' + err, response: 'Error' });
        });
};







/*********** View All Company / SINGLE ***************/

exports.getAllCompanies = (req, res) => {
    var company_id = req.query.id;
    if (company_id) {
        db.Company
            .findOne({
                where: { company_id: company_id },
                attributes: [
                    'company_ip',
                    'company_unqid',
                    'company_name',
                    'company_shortcode',
                    'company_person',
                    'company_mob',
                    'company_district',],
                order: [['company_id', 'DESC']],
            })
            .then((companies) => {
                if (companies) {
                    return res.status(200).send({ response: 'success', result: companies });
                } else {
                    return res
                        .status(200)
                        .send({ response: 'failure', result: 'company not found' });
                }


            });
    } else {
        db.Company
            .findAll({
                where: { company_status: 0 },
                order: [['company_id', 'DESC']],
                attributes: [
                    'company_ip',
                    'company_unqid',
                    'company_name',
                    'company_shortcode',
                    'company_person',
                    'company_mob',
                    'company_district'
                ],
                include: [
                    { model: db.User, attributes: ['id', 'fname', 'lname'], as: 'User' },
                ],
            })
            .then((companies) => {
                res.send({ data: companies });

            });
    }
};
/*********** Update Company ***************/

exports.updateCompany = (req, res) => {
    var edited_by = req.body.auth_userid;
    console.log(req);
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
        user_name = userInfo.fname + ' ' + userInfo.lname;
    });

    var company_id = req.params.id;
    db.Company
        .findOne({
            where: { company_id: company_id },
            attributes: [
                'company_ip',
                'company_unqid',
                'company_name',
                'company_shortcode',
                'company_person',
                'company_mob',
                'company_district'
            ],
        })
        .then((companyInfo) => {
            if (companyInfo) {
                companyInfo.company_ip = req.ip;
                companyInfo.company_unqid = req.body.company_unqid;
                companyInfo.company_name = req.body.company_name;
                companyInfo.company_shortcode = req.body.company_shortcode;
                companyInfo.company_person = req.body.company_person,
                    companyInfo.company_mob = req.body.company_mob,
                    companyInfo.company_district = req.body.company_district,
                    companyInfo.updatedBy = edited_by;
                return companyInfo.save();
            } else {
                return res
                    .status(200)
                    .send({ response: 'failure', result: 'Company not found' });
            }
        })
        .then((result) => {
            var ip = req.ip;
            var activity =
                'Company ID: ' + result.company_id + ' has been updated by ' + user_name;
            db.userLog.create({
                activity_ip: ip,
                activity_action: 'Edit company',
                activity_user: user_name,
                activity_user_id: edited_by,
                activity_desc: activity,
            });
            db.Company
                .findAll({
                    where: { company_status: 0 },
                    where: { company_id: result.company_id },
                    order: [['company_id', 'DESC']],
                    attributes: [
                        'company_ip',
                        'company_unqid',
                        'company_name',
                        'company_shortcode',
                        'company_person',
                        'company_mob',
                        'company_district'
                    ],
                    include: [
                        {
                            model: db.User,
                            attributes: ['id', 'fname', 'lname'],
                            as: 'User',
                        },
                    ],
                })
                .then((companies) => {
                    res.send({ data: companies });
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Error ' + err, response: 'Error' });
                });
        });
};

/************* Delete Company *********/
exports.deleteCompany = (req, res) => {
    var edited_by = req.params.auth_id;
    //select user's details
    var user_name = '';
    db.User.findOne({ where: { id: edited_by } }).then((userInfo) => {
        user_name = userInfo.fname + ' ' + userInfo.lname;
    });

    var company_id = req.params.id;
    db.Company
        .findOne({ where: { company_id: company_id } })
        .then((Company) => {
            if (Company) {
                Company.company_status = 1;
                Company.company_ip = req.ip;
                Company.updatedBy = edited_by;
                return Company.save();
            } else {
                return res
                    .status(200)
                    .send({ response: 'failure', result: 'Company not found' });
            }
        })
        .then((result) => {
            var ip = req.ip;
            var activity =
                'company ID: ' + result.company_id + ' has been deleted by ' + user_name;
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
