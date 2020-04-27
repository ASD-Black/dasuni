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


exports.getAccountDetails = function (req, res) {
    let Query1 = "\
                SELECT w.RegNo,w.balance\
                FROM  wallet w\
                WHERE w.RegNo = '" + req.query.id + "' ";

    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Failed",
                isSuccess: false
            });
        else {
            if (result[0]) {
                let Query2 = "\
                    SELECT *\
                    FROM student s\
                    WHERE s.RegNo = '"+ req.query.id + "' ";
                student_db.query(Query2, (err, result_a) => {
                    if (err)
                        return res.status(200).json({
                            message: "Failed",
                            isSuccess: false
                        });
                    else {
                        if (result_a[0]) {
                            return res.status(200).json({
                                accountData: result[0],
                                studentData: result_a[0],
                                message: "Data Received",
                                isSuccess: true
                            });
                        }
                    }
                });

            }
        }
    });
}

exports.updateAccountBalance = function (req, res) {
    console.log("hit", req.query.id);
    let Query1 = "\
                UPDATE wallet w \
                SET w.balance = '"+ req.body.amount + "' \
                WHERE w.RegNo = '" + req.body.id + "' ";
    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: "Update Failed",
                log : err,
                isSuccess: false
            });
        else {
            if (result.affectedRows > 0) {
                let Query2 = "\
                INSERT INTO deposit_payments (RegNo,amount,`date` ) \
                VALUES('"+req.body.id+"','"+req.body.r_amount+"',CURRENT_TIMESTAMP()) ";
                shuttle_db.query(Query2, (err, result_a) => {
                    if (err)
                        return res.status(200).json({
                            message: "Failed",
                            log : err,
                            isSuccess: false
                        });
                    else {
                        if (result.affectedRows > 0) {
                            return res.status(200).json({
                                message: req.body.id + " Account is Recharged by RS." + req.body.r_amount,
                                isSuccess: true
                            });
                        }
                    }
                });
            }
        }
    });
}

