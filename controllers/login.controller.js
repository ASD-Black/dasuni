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

app.use(function (req, res, next) {
  console.log("req.body"); // populated!
  console.log(req.body); // populated!
  console.log("req.body"); // populated!
});


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

/* ### login ## */
exports.login = function (req, res) {


  let usernameQuery = "SELECT * FROM login WHERE Username='" + req.body.userName + "'AND Password='" + req.body.password + "' ";
  db.query(usernameQuery, (err, result) => {
    if (err) //throw err;
      return res.status(500).json({ message: err,  isSuccess: false });
    else {
      if (result[0]) {
        console.log(result[0].userName);
        return res.status(200).json({
          response: {
            userName: result[0].Username,
          },
          message: "Logged in Successfully",
          isSuccess: true
        });
      }
      else {
        return res.status(200).json({
          response: {
            userName: "",
            password: ""
          },
          message: "Login Failed.Check Your Credentials And Retry",
          isSuccess: false
        });
      }
    }
  });
}

/* ### add users ## */
exports.addUsers = function (req, res) {
  console.log(req.body);
  let addUserQuery = "\
                          INSERT INTO login\
                         (Username, Password, Recovery, Role_ID)\
                          VALUES ?";
  db.query(addUserQuery,[req.body.user], (err, result) => {
    if (err)
      return res.status(200).json({
        message: err,
        isSuccess: false
      });
    else {
      if (result.affectedRows > 0) {
        return res.status(200).json({
          response: "Successfull",
          message: "Successfull",
          isSuccess: true
        });

      }
    }
  });
}





