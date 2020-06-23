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


exports.progressReportData = function (req, res) {
    let Query1 = "\
                SELECT\
	            (SELECT COUNT(p2.RegNo ) FROM passengers p2 ) as passengers,\
                (SELECT sum(dp.amount) FROM deposit_payments dp \
                WHERE dp.date BETWEEN '"+req.query.fromDate+"'AND '"+req.query.toDate+"' ) as income \
                 ;";

    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: err,
                isSuccess: false
            });
        else {
            if (result[0]) {
                return res.status(200).json({
                    data: result,
                    message: "Data Received",
                    isSuccess: true
                });
            }
        }
    });
}
exports.expenseReportData = function (req, res) {
    let Query1 = "\
                SELECT * \
                FROM fuel_expenses fe \
                WHERE fe.date BETWEEN '"+req.query.fromDate+"'AND '"+req.query.toDate+"' \
                 ;";
    let Query2 = "\
                SELECT * \
                FROM repair_expenses re \
                WHERE re.date BETWEEN '"+req.query.fromDate+"'AND '"+req.query.toDate+"' \
                 ;";

    shuttle_db.query(Query1, (err, result) => {
        if (err)
            return res.status(200).json({
                message: err,
                isSuccess: false
            });
        else {
            if (result[0]) {
                shuttle_db.query(Query2, (err, result1) => {
                    if (err)
                        return res.status(200).json({
                            message: err,
                            isSuccess: false
                        });
                    else {
                        if (result1[0]) {
                            return res.status(200).json({
                                fuel_expenses: result,
                                repair_expenses: result1,
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


