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
    console.log("hit",req.query.id);
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
            tileData: {
                shuttles : 5,
                passengers : 84 ,
                time : 3.3 ,
                income : 4560
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
  
    
exports.getIncomeChartData = function (req, res) {
    console.log("hit",req.query.id);
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
                January:[
                  { data: [5300], label: "January Week 1",week:1 },
                  { data: [3400], label: "January Week 2",week:2 },
                  { data: [3455], label: "January Week 3",week:3 },
                  { data: [5670], label: "January Week 4",week:4 },
                ],
                February:[
                  { data: [7800], label: "February Week 1",week:1 },
                  { data: [3400], label: "February Week 2",week:2 },
                  { data: [5300], label: "February Week 3",week:3 },
                  { data: [5670], label: "February Week 4",week:4 },
                ],
                March:[
                  { data: [8400], label: "March Week 1",week:1 },
                  { data: [6570], label: "March Week 2",week:2 },
                  { data: [3455], label: "March Week 3",week:3 },
                  { data: [9500], label: "March Week 4",week:4 },
                ]
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
    console.log("hit",req.query.id);
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
                January:{
                    metro:[4,5,1,2,4,1],
                    kolpity:[3,5,2,0,0,0],
                    negombo:[0,5,1,2,4,10],
                    panadura:[1,3,2,6,0,1],
                    jaela:[4,7,2,2,4,0],
                    gampaha:[3,1,2,0,0,1]
                },
                February:{
                    metro:[34,57,21,2,4,10],
                    kolpity:[34,57,21,2,4,10],
                    negombo:[34,57,21,2,4,10],
                    panadura:[34,57,21,2,4,10],
                    jaela:[34,57,21,2,4,10],
                    gampaha:[34,57,21,2,4,10]
                },
                March:{
                    metro:[34,57,21,2,4,10],
                    kolpity:[34,57,21,2,4,10],
                    negombo:[34,57,21,2,4,10],
                    panadura:[34,57,21,2,4,10],
                    jaela:[34,57,21,2,4,10],
                    gampaha:[34,57,21,2,4,10]
                },
                April:{
                    metro:[34,57,21,2,4,10],
                    kolpity:[34,57,21,2,4,10],
                    negombo:[34,57,21,2,4,10],
                    panadura:[34,57,21,2,4,10],
                    jaela:[34,57,21,2,4,10],
                    gampaha:[34,57,21,2,4,10]
                },
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
  
exports.getInquiryChartData = function (req, res) {
    console.log("hit",req.query.id);
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
            chartValues: [
                {id:1,shuttleId:"Metro",description:"Bus is too slow",repotedDate:"2020-01-11",reporter:"anonymous"},
                {id:2,shuttleId:"Kolpity",description:"Not on time",repotedDate:"2020-01-13",reporter:"anonymous"},
                {id:3,shuttleId:"Negombo",description:"Crowded",repotedDate:"2020-01-15",reporter:"anonymous"},
                {id:4,shuttleId:"Panadura",description:"Bus is too old",repotedDate:"2020-01-21",reporter:"anonymous"},
                {id:5,shuttleId:"Panadura",description:"Bus is too early",repotedDate:"2020-01-25",reporter:"anonymous"}
              ],
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
