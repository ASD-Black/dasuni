const mongoose = require('mongoose')
const passport = require('passport')
const _ = require('lodash')
const mysql = require('mysql')

const User = mongoose.model('User')

var con = mysql.createConnection({
    host: 'localhost', // ip address of server running mysql
    user: 'root', // user name to your mysql database
    password: 'root',// corresponding password
    database: 'shuttle_db'
    //insecureAuth : true,
  });

  var con_sliitDb = mysql.createConnection({
    host: 'localhost', // ip address of server running mysql
    user: 'root', // user name to your mysql database
    password: 'root',// corresponding password
    database: 'sliit'
    //insecureAuth : true,
  });

  con.connect(function(err) {
    if(!err){
        console.log('SQL db(shuttle_db) connection succeeded..!')
    } else{
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2))
    }
  });

  con_sliitDb.connect(function(err) {
    if(!err){
        console.log('SQL db(sliit) connection succeeded..!')
    } else{
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2))
    }
  });


// SQL APIs -----------------------------------------------------------------------------------------------------------------------

module.exports.login = (req, res, next) =>{
    
    var RegNo = req.body.RegNo;
    var password = req.body.password;

    con.query(

      "SELECT * FROM passengers WHERE RegNo = ? AND password = ?",
      [RegNo, password], function(err, row, field){
    
        if(err){
          console.log(err);
          res.send({
            'success': false,
            'message': 'could not connect to the db'
          });
        }
    
        if(row.length > 0){
          res.send({
            'success': true,
            'passengers': row[0].RegNo  
          });
        }

        else{
          res.send({
            'success': false,
            'message1': 'passenger not found'
          });
        }
      }
    );
}

module.exports.signUp = (req, res, next) => {
  var RegNo = req.body.regno;
  var nic = req.body.nic;
  var email = req.body.email;
  var password = req.body.Password;


    const queryString = "INSERT INTO passengers (RegNo, contactNo, email, password) VALUES (?,?,?,?)"
    //const QS ="SELECT * FROM customer WHERE uname = ? AND enamil = ?"

    con.query(queryString, [RegNo, nic, email, password], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Thank You... Registation succesfull'
            });
        }

        else if(err){
            res.json({
            'success': false,
            'errmessage': 'could not connect to the db'
            });
        }
        
    })
}

module.exports.getLoadedUser= (req, res, next) => {
  var category=req.params.RegNo

  const userDitails = "SELECT * FROM passengers WHERE RegNo = ?"

  con.query(userDitails, [category], (err, results, fields)=>{

      if(err){
        console.log(err);
        res.json({
          'success': false,
          'message': 'could not connect to the db'
        });
      }

      if(results.length > 0){
        res.json({
          'success': true,
          'RegNo': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'User not found'
        });
      }
  })
}

module.exports.getLoadedUserFromSLIITdb= (req, res, next) => {
  var category=req.params.RegNo

  const userDitails = "SELECT * FROM student WHERE RegNo = ?"

  con_sliitDb.query(userDitails, [category], (err, results, fields)=>{

      if(err){
        console.log(err);
        res.json({
          'success': false,
          'message': 'could not connect to the db'
        });
      }

      if(results.length > 0){
        res.json({
          'success': true,
          'RegNo': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'User not found'
        });
      }
  })
}

module.exports.getAccountBal= (req, res, next) => {
  var category=req.params.RegNo

  const accBal = "SELECT * FROM wallet WHERE RegNo = ?"

  con.query(accBal, [category], (err, results, fields)=>{

      if(err){
        console.log(err);
        res.json({
          'success': false,
          'message': 'could not connect to the db'
        });
      }

      if(results.length > 0){
        res.json({
          'success': true,
          'RegNo': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'User not found'
        });
      }
  })
}

module.exports.makeInquiry = (req, res, next) => {
  var RegNo = req.body.regno;
  var msg = req.body.msg;
  var inq_date = req.body.inq_date;
  var contactNo = req.body.contactNo;



    const queryString = "INSERT INTO inquiry (RegNo, msg, contactNo, inq_date) VALUES (?,?,?,?)"
    

    con.query(queryString, [RegNo, msg, contactNo, inq_date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Thank You... Inquiry succesfull'
            });
        }

        else if(err){
            res.json({
            'success': false,
            'errmessage': 'could not connect to the db'
            });
        }
        
    })
}