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
                shuttles : 0,
                passengers : 0,
                time : 0 ,
                income : 0
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
                January:{
                    all:     [
                        { data: [68000], label: "January Week 1",week:1 },
                        { data: [34000], label: "January Week 2",week:2 },
                        { data: [32550], label: "January Week 3",week:3 },
                        { data: [56700], label: "January Week 4",week:4 },
                      ],
                    metro:   [
                        { data: [5300], label: "January Week 1",week:1 },
                        { data: [3400], label: "January Week 2",week:2 },
                        { data: [3455], label: "January Week 3",week:3 },
                        { data: [5670], label: "January Week 4",week:4 },
                      ],
                    kolpity: 
                    [
                        { data: [1200], label: "January Week 1",week:1 },
                        { data: [3500], label: "January Week 2",week:2 },
                        { data: [2645], label: "January Week 3",week:3 },
                        { data: [7670], label: "January Week 4",week:4 },
                      ],
                    negombo: 
                    [
                        { data: [3300], label: "January Week 1",week:1 },
                        { data: [2400], label: "January Week 2",week:2 },
                        { data: [7855], label: "January Week 3",week:3 },
                        { data: [3270], label: "January Week 4",week:4 },
                      ],
                    panadura:
                    [
                        { data: [2300], label: "January Week 1",week:1 },
                        { data: [5600], label: "January Week 2",week:2 },
                        { data: [7855], label: "January Week 3",week:3 },
                        { data: [1270], label: "January Week 4",week:4 },
                      ],
                    jaela:   
                    [
                        { data: [1200], label: "January Week 1",week:1 },
                        { data: [5700], label: "January Week 2",week:2 },
                        { data: [7755], label: "January Week 3",week:3 },
                        { data: [1270], label: "January Week 4",week:4 },
                      ],
                    gampaha: 
                    [
                        { data: [3500], label: "January Week 1",week:1 },
                        { data: [6800], label: "January Week 2",week:2 },
                        { data: [9755], label: "January Week 3",week:3 },
                        { data: [2170], label: "January Week 4",week:4 },
                      ]
                }
                ,
                February:{
                    all:     [
                        { data: [23000], label: "February Week 1",week:1 },
                        { data: [12000], label: "February Week 2",week:2 },
                        { data: [65550], label: "February Week 3",week:3 },
                        { data: [57700], label: "February Week 4",week:4 },
                      ],
                    metro:   [
                        { data: [5300], label: "February Week 1",week:1 },
                        { data: [3430], label: "February Week 2",week:2 },
                        { data: [1245], label: "February Week 3",week:3 },
                        { data: [2140], label: "February Week 4",week:4 },
                      ],
                    kolpity: 
                    [
                        { data: [2350], label: "February Week 1",week:1 },
                        { data: [2350], label: "February Week 2",week:2 },
                        { data: [3420], label: "February Week 3",week:3 },
                        { data: [2630], label: "February Week 4",week:4 },
                      ],
                    negombo: 
                    [
                        { data: [2100], label: "February Week 1",week:1 },
                        { data: [5700], label: "February Week 2",week:2 },
                        { data: [7255], label: "February Week 3",week:3 },
                        { data: [1270], label: "February Week 4",week:4 },
                      ],
                    panadura:
                    [
                        { data: [8300], label: "February Week 1",week:1 },
                        { data: [3400], label: "February Week 2",week:2 },
                        { data: [3455], label: "February Week 3",week:3 },
                        { data: [4670], label: "February Week 4",week:4 },
                      ],
                    jaela:   
                    [
                        { data: [4600], label: "February Week 1",week:1 },
                        { data: [2100], label: "February Week 2",week:2 },
                        { data: [7855], label: "February Week 3",week:3 },
                        { data: [1270], label: "February Week 4",week:4 },
                      ],
                    gampaha: 
                    [
                        { data: [5400], label: "February Week 1",week:1 },
                        { data: [6800], label: "February Week 2",week:2 },
                        { data: [1255], label: "February Week 3",week:3 },
                        { data: [7870], label: "February Week 4",week:4 },
                      ]
                },
                March:{
                    all:     [
                        { data: [53000], label: "March Week 1",week:1 },
                        { data: [14000], label: "March Week 2",week:2 },
                        { data: [64550], label: "March Week 3",week:3 },
                        { data: [76700], label: "March Week 4",week:4 },
                      ],
                    metro:   [
                        { data: [1200], label: "March Week 1",week:1 },
                        { data: [2100], label: "March Week 2",week:2 },
                        { data: [4555], label: "March Week 3",week:3 },
                        { data: [1270], label: "March Week 4",week:4 },
                      ],
                    kolpity: 
                    [
                        { data: [5600], label: "March Week 1",week:1 },
                        { data: [7800], label: "March Week 2",week:2 },
                        { data: [5355], label: "March Week 3",week:3 },
                        { data: [2370], label: "March Week 4",week:4 },
                      ],
                    negombo: 
                    [
                        { data: [2300], label: "March Week 1",week:1 },
                        { data: [7500], label: "March Week 2",week:2 },
                        { data: [5255], label: "March Week 3",week:3 },
                        { data: [1270], label: "March Week 4",week:4 },
                      ],
                    panadura:
                    [
                        { data: [1200], label: "March Week 1",week:1 },
                        { data: [5700], label: "March Week 2",week:2 },
                        { data: [3455], label: "March Week 3",week:3 },
                        { data: [7970], label: "March Week 4",week:4 },
                      ],
                    jaela:   
                    [
                        { data: [1200], label: "March Week 1",week:1 },
                        { data: [5300], label: "March Week 2",week:2 },
                        { data: [7655], label: "March Week 3",week:3 },
                        { data: [2370], label: "March Week 4",week:4 },
                      ],
                    gampaha: 
                    [
                        { data: [6300], label: "March Week 1",week:1 },
                        { data: [2300], label: "March Week 2",week:2 },
                        { data: [7955], label: "March Week 3",week:3 },
                        { data: [5970], label: "March Week 4",week:4 },
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
                    all:     [15,26,10,12,12,13],
                    metro:   [4,5,1,2,4,1],
                    kolpity: [3,5,2,0,0,0],
                    negombo: [0,5,1,2,4,10],
                    panadura:[1,3,2,6,0,1],
                    jaela:   [4,7,2,2,4,0],
                    gampaha: [3,1,2,0,0,1]
                },
                February:{
                    all:     [25,16,11,15,20,11],
                    metro:   [4,8,1,2,4,1],
                    kolpity: [1,6,3,9,11,0],
                    negombo: [3,3,6,3,4,5],
                    panadura:[2,1,7,8,6,1],
                    jaela:   [5,7,1,3,0,8],
                    gampaha: [1,8,7,5,3,0]
                },
                March:{
                    all:     [15,20,20,15,18,15],
                    metro:   [4,5,11,1,4,3],
                    kolpity: [1,11,1,4,1,4],
                    negombo: [4,1,1,7,0,6],
                    panadura:[0,3,5,6,0,12],
                    jaela:   [4,1,9,4,5,1],
                    gampaha: [3,7,13,2,8,0]
                },
                April:{
                    all:     [10,25,10,15,20,12],
                    metro:   [2,7,1,2,4,3],
                    kolpity: [4,5,0,9,6,3],
                    negombo: [5,4,4,1,9,4],
                    panadura:[1,1,2,7,1,11],
                    jaela:   [4,5,5,2,0,0],
                    gampaha: [0,7,11,0,4,10]
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
