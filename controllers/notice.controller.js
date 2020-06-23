'use strict';

var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())
router.use(cors())


// support on x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(function (req, res, next) { });


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(router);


exports.getNotices = function (req, res) {
    let Query1 = "\
                SELECT *\
                FROM  publicnotices p\
                order by p.`date` desc ";

    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Failed",
                isSuccess: false
            });
        else {
            if (result[0]) {
                return res.status(200).json({
                    notices: result,
                    message: "Data Received",
                    isSuccess: true
                });
            }
        }
    });
}

exports.addNotice = function (req, res) {
    let Query1 = "\
                INSERT INTO publicnotices (msg,msgType,`date`,reporter ) \
                values('"+req.body.description+"','"+req.body.type+"','"+req.body.date+"','"+req.body.reporter+"'); "
    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Failed",
                isSuccess: false
            });
        else {
            if (result.affectedRows > 0) {
                return res.status(200).json({
                    notices: result,
                    message: "Notice Added",
                    isSuccess: true
                });
            }
        }
    });
}

exports.updateNotice = function (req, res) {
    let Query1 = "\
                UPDATE publicnotices p \
                SET p.msg = '"+ req.body.msg + "' \
                WHERE p.n_id = '" + req.body.n_id + "' ";
    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Update failed",
                log : err,
                isSuccess: false
            });
        else {
            if (result.affectedRows > 0) {
                return res.status(200).json({
                    message: "Notice '"+req.body.n_id +"' updated successfully",
                    isSuccess: true
                });
            }
        }
    });
}

exports.deleteNotice = function (req, res) {
    let Query1 = "\
                DELETE FROM publicnotices p \
                WHERE p.n_id = '" + req.query.id+ "' ";
    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Update Failed",
                log : err,
                isSuccess: false
            });
        else {
            if (result.affectedRows > 0) {
                return res.status(200).json({
                    message: "Notice '"+req.body.id +"' Deleted ",
                    isSuccess: true
                });
            }
        }
    });
}


