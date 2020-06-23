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


exports.getTileData = function (req, res) {
  let Query1 = "\
  SELECT * \
  FROM shuttle_times "
  shuttle_db.query(Query1, (err, result) => {
    if (err)
      return res.status(200).json({
        message: err,
        isSuccess: false
      });
    else {
      if (result[0]) {
        return res.status(200).json({
          times: result,
          message: "shuttle times fetched",
          isSuccess: true
        });
      }
    }
  });
}


exports.getIncomeChartData = function (req, res) {
  console.log("hit", req.query.id);
  // let donatorSearchQuery = "\
  //                     SELECT *\
  //                     FROM donator d\
  //                     WHERE d.Donor_ID='" + req.query.id + "' OR d.First_Name LIKE '%"+req.query.id+"%' ";
  // db.query(donatorSearchQuery, (err, result) => {
  //   if (err)
  //     return res.status(500).json({ message: err });
  //   else {
  //     if (result[0]) {
  return res.status(200).json({
    chartValues: {
      January: {
        all: [
          { data: [68000], label: "January Week 1", week: 1 },
          { data: [34000], label: "January Week 2", week: 2 },
          { data: [32550], label: "January Week 3", week: 3 },
          { data: [56700], label: "January Week 4", week: 4 },
        ],
        metro: [
          { data: [5300], label: "January Week 1", week: 1 },
          { data: [3400], label: "January Week 2", week: 2 },
          { data: [3455], label: "January Week 3", week: 3 },
          { data: [5670], label: "January Week 4", week: 4 },
        ],
        kolpity:
          [
            { data: [1200], label: "January Week 1", week: 1 },
            { data: [3500], label: "January Week 2", week: 2 },
            { data: [2645], label: "January Week 3", week: 3 },
            { data: [7670], label: "January Week 4", week: 4 },
          ],
        negombo:
          [
            { data: [3300], label: "January Week 1", week: 1 },
            { data: [2400], label: "January Week 2", week: 2 },
            { data: [7855], label: "January Week 3", week: 3 },
            { data: [3270], label: "January Week 4", week: 4 },
          ],
        panadura:
          [
            { data: [2300], label: "January Week 1", week: 1 },
            { data: [5600], label: "January Week 2", week: 2 },
            { data: [7855], label: "January Week 3", week: 3 },
            { data: [1270], label: "January Week 4", week: 4 },
          ],
        jaela:
          [
            { data: [1200], label: "January Week 1", week: 1 },
            { data: [5700], label: "January Week 2", week: 2 },
            { data: [7755], label: "January Week 3", week: 3 },
            { data: [1270], label: "January Week 4", week: 4 },
          ],
        gampaha:
          [
            { data: [3500], label: "January Week 1", week: 1 },
            { data: [6800], label: "January Week 2", week: 2 },
            { data: [9755], label: "January Week 3", week: 3 },
            { data: [2170], label: "January Week 4", week: 4 },
          ]
      }
      ,
      February: {
        all: [
          { data: [23000], label: "February Week 1", week: 1 },
          { data: [12000], label: "February Week 2", week: 2 },
          { data: [65550], label: "February Week 3", week: 3 },
          { data: [57700], label: "February Week 4", week: 4 },
        ],
        metro: [
          { data: [5300], label: "February Week 1", week: 1 },
          { data: [3430], label: "February Week 2", week: 2 },
          { data: [1245], label: "February Week 3", week: 3 },
          { data: [2140], label: "February Week 4", week: 4 },
        ],
        kolpity:
          [
            { data: [2350], label: "February Week 1", week: 1 },
            { data: [2350], label: "February Week 2", week: 2 },
            { data: [3420], label: "February Week 3", week: 3 },
            { data: [2630], label: "February Week 4", week: 4 },
          ],
        negombo:
          [
            { data: [2100], label: "February Week 1", week: 1 },
            { data: [5700], label: "February Week 2", week: 2 },
            { data: [7255], label: "February Week 3", week: 3 },
            { data: [1270], label: "February Week 4", week: 4 },
          ],
        panadura:
          [
            { data: [8300], label: "February Week 1", week: 1 },
            { data: [3400], label: "February Week 2", week: 2 },
            { data: [3455], label: "February Week 3", week: 3 },
            { data: [4670], label: "February Week 4", week: 4 },
          ],
        jaela:
          [
            { data: [4600], label: "February Week 1", week: 1 },
            { data: [2100], label: "February Week 2", week: 2 },
            { data: [7855], label: "February Week 3", week: 3 },
            { data: [1270], label: "February Week 4", week: 4 },
          ],
        gampaha:
          [
            { data: [5400], label: "February Week 1", week: 1 },
            { data: [6800], label: "February Week 2", week: 2 },
            { data: [1255], label: "February Week 3", week: 3 },
            { data: [7870], label: "February Week 4", week: 4 },
          ]
      },
      March: {
        all: [
          { data: [53000], label: "March Week 1", week: 1 },
          { data: [14000], label: "March Week 2", week: 2 },
          { data: [64550], label: "March Week 3", week: 3 },
          { data: [76700], label: "March Week 4", week: 4 },
        ],
        metro: [
          { data: [1200], label: "March Week 1", week: 1 },
          { data: [2100], label: "March Week 2", week: 2 },
          { data: [4555], label: "March Week 3", week: 3 },
          { data: [1270], label: "March Week 4", week: 4 },
        ],
        kolpity:
          [
            { data: [5600], label: "March Week 1", week: 1 },
            { data: [7800], label: "March Week 2", week: 2 },
            { data: [5355], label: "March Week 3", week: 3 },
            { data: [2370], label: "March Week 4", week: 4 },
          ],
        negombo:
          [
            { data: [2300], label: "March Week 1", week: 1 },
            { data: [7500], label: "March Week 2", week: 2 },
            { data: [5255], label: "March Week 3", week: 3 },
            { data: [1270], label: "March Week 4", week: 4 },
          ],
        panadura:
          [
            { data: [1200], label: "March Week 1", week: 1 },
            { data: [5700], label: "March Week 2", week: 2 },
            { data: [3455], label: "March Week 3", week: 3 },
            { data: [7970], label: "March Week 4", week: 4 },
          ],
        jaela:
          [
            { data: [1200], label: "March Week 1", week: 1 },
            { data: [5300], label: "March Week 2", week: 2 },
            { data: [7655], label: "March Week 3", week: 3 },
            { data: [2370], label: "March Week 4", week: 4 },
          ],
        gampaha:
          [
            { data: [6300], label: "March Week 1", week: 1 },
            { data: [2300], label: "March Week 2", week: 2 },
            { data: [7955], label: "March Week 3", week: 3 },
            { data: [5970], label: "March Week 4", week: 4 },
          ]
      }
    },
    message: "Data Received",
    isSuccess: true
  });
  //     }
  //     else {
  //       return res.status(200).json({
  //         memberDetails: "Empty",
  //         message: "No data found",
  //         isSuccess: false
  //       });
  //     }
  //   }
  // });
}

exports.getPassengerFbckChartData = function (req, res) {
  console.log("hit");
  let feedbackQuery = "\
                        SELECT sr.shuttle,sr.score AS rating,COUNT(sr.score) AS count , sr.`date` \
                        FROM star_rating sr \
                        WHERE YEAR(sr.date)=YEAR (CURDATE())\
                        GROUP BY sr.score,sr.shuttle,sr.date \
                        ORDER BY sr.shuttle \
                        ";
  shuttle_db.query(feedbackQuery, (err, result) => {
    if (err)
      return res.status(500).json({ message: err });
    else {
      if (result[0]) {
        return res.status(200).json({
          chartValues: result,
          message: "Data Received",
          isSuccess: true
        });
      }
      else {
        return res.status(200).json({
          chartValues: [],
          message: "No data found",
          isSuccess: false
        });
      }
    }
  });
}

exports.getCurrentIncomeData = function (req, res) {
  console.log("hit");
  let Query1 = "\
                        SELECT MONTH (dp.`date`) as month ,sum(dp.amount)as amount,sr.registered_shuttle \
                        FROM deposit_payments dp , student_reg sr \
                        WHERE dp.RegNo = sr.reg_no AND YEAR(dp.`date` )=YEAR (CURDATE())\
                        group by MONTH (dp.`date`),sr.registered_shuttle\
                        ";
  shuttle_db.query(Query1, (err, result) => {
    if (err)
      return res.status(500).json({ message: err });
    else {
      if (result[0]) {
        return res.status(200).json({
          chartValues: result,
          message: "Data Received",
          isSuccess: true
        });
      }
      else {
        return res.status(200).json({
          chartValues: [],
          message: "No data found",
          isSuccess: false
        });
      }
    }
  });
}

exports.getExpenditurePatterns = function (req, res) {
  console.log("hit");
  let Query1 = "\
                        select dp.RegNo,sr.registered_shuttle,MONTH (dp.`date`) as month, sum(dp.amount) amount\
                        from deposit_payments dp , student_reg sr \
                        where dp.RegNo = sr.reg_no AND dp.RegNo in (select RegNo FROM  deposit_payments dp2)\
                        group by dp.RegNo,MONTH (dp.`date`)\
                        ";
  shuttle_db.query(Query1, (err, result) => {
    if (err)
      return res.status(500).json({ message: err });
    else {
      if (result[0]) {
        return res.status(200).json({
          patterns: result,
          message: "Data Received",
          isSuccess: true
        });
      }
      else {
        return res.status(200).json({
          chartValues: [],
          message: "No data found",
          isSuccess: false
        });
      }
    }
  });
}