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


exports.getInquiries = function (req, res) {
    let Query1 = "\
                SELECT *\
                FROM  inquiry i\
                order by i.`inq_date` desc ";

    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Failed",
                isSuccess: false
            });
        else {
            if (result[0]) {
                return res.status(200).json({
                    inquires: result,
                    message: "Data Received",
                    isSuccess: true
                });
            }
        }
    });
}

exports.addReply = function (req, res) {
    let Query1 = "\
                INSERT INTO inquiryreplys \
                values('"+req.body.id+"','"+req.body.regno+"','"+req.body.msg+"','"+req.body.date+"','"+req.body.commenter+"'); "
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
                    message: "Comment Added",
                    isSuccess: true
                });
            }
        }
    });
}

exports.getInqReplies = function (req, res) {
    let Query1 = "\
                select *  \
                from inquiry i , inquiryreplys i2 \
                WHERE i.i_id = i2.rInq_id AND i2.rInq_id = '" + req.query.id + "'  "
    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Failed",
                isSuccess: false
            });
        else {
            if (result[0]) {
                return res.status(200).json({
                    replies: result,
                    message: "Fetched inquiry thread",
                    isSuccess: true
                });
            }
        }
    });
}

exports.updateInquiry = function (req, res) {
    let Query1 = "\
                UPDATE inquiry i \
                SET i.status = '"+ req.body.status + "' \
                WHERE i.i_id = '" + req.body.id + "' ";
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
                    message: "Inquiry '"+req.body.id +"' closed",
                    isSuccess: true
                });
            }
        }
    });
}


