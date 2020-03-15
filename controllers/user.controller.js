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
  var title = req.body.titles;



    const queryString = "INSERT INTO inquiry (RegNo, title, msg, contactNo, inq_date) VALUES (?,?,?,?,?)"
    

    con.query(queryString, [RegNo,title, msg, contactNo, inq_date], (err, results, fields) => {  
        
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

module.exports.getInquiryData= (req, res, next) => {
  var category=req.params.RegNo

  const inquiryDitails = "SELECT * FROM inquiry WHERE RegNo = ?"

  con.query(inquiryDitails, [category], (err, results, fields)=>{

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

//--------------->>>>>>>>> get Passengers notifications

module.exports.getPassengersNotices= (req, res, next) => {

  const NotceDitails2 = "SELECT * FROM publicnotices WHERE msgType ='P' "

  con.query(NotceDitails2, (err, results, fields)=>{

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
          'Notices': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'Locations not found'
        });
      }
  })
}

//////////////gamma ge part eka ---------------------------------------------------------------------------------------------------------------------------

//--------------->>>>>>>>> get passengers pickUP and dropOFF locations

module.exports.getUserLocation= (req, res, next) => {

  const userDitails = "SELECT * FROM location WHERE journey_status ='Incomplete' "

  con.query(userDitails, (err, results, fields)=>{

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
          'Locations': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'Locations not found'
        });
      }
  })
}


//--------------->>>>>>>>> get driver notifications

module.exports.getDriversNotices= (req, res, next) => {

  const NotceDitails = "SELECT * FROM publicnotices WHERE msgType ='D' "

  con.query(NotceDitails, (err, results, fields)=>{

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
          'Notices': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'Locations not found'
        });
      }
  })
}

//////////////geeth malli ge part eka ---------------------------------------------------------------------------------------------------------------------------


//--------------->>>>>>>>> make replys for users inquiries

module.exports.makeInquiryReplys = (req, res, next) => {
  var RegNo = req.body.regno;
  var msg = req.body.msg;
  var date = req.body.reply_date;



    const queryString = "INSERT INTO inquiryreplys (RegNo, msg, date) VALUES (?,?,?)"
    

    con.query(queryString, [RegNo, msg, date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Successfully send'
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

//--------------->>>>>>>>> make manual payments

module.exports.makeDeposit_payments = (req, res, next) => {
  var RegNo = req.body.regno;
  var amount = req.body.amount;
  var date = req.body.payment_date;



    const queryString1 = "INSERT INTO deposit_payments (RegNo, amount, date) VALUES (?,?,?)"
    

    con.query(queryString1, [RegNo, amount , date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Payment successfull'
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

//--------------->>>>>>>>> make public notices

module.exports.makePublicNotices = (req, res, next) => {
  var msgType = req.body.msgType;
  var msg = req.body.msg;
  var date = req.body.notice_date;



    const queryString = "INSERT INTO publicnotices (msg, msgType, date) VALUES (?,?,?)"
    

    con.query(queryString, [msg, msgType, date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Successfully send'
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

//--------------->>>>>>>> Register a bus

module.exports.registerBuses = (req, res, next) => {
  var bus_id = req.body.bus_id;
  var vehicle_number = req.body.vehicle_number;
  var route = req.body.route;
  var reg_date = req.body.reg_date;



    const queryString3 = "INSERT INTO buses (bus_id, vehicle_number, route, reg_date) VALUES (?,?,?,?)"
    

    con.query(queryString3, [bus_id, vehicle_number, route, reg_date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Register successfull'
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

//--------------->>>>>>>> make fuel charges

module.exports.makeFuelExpenses = (req, res, next) => {
  var bus_id = req.body.bus_id;
  var amount = req.body.amount;
  var fuel_count = req.body.fuel_count;
  var date = req.body.date;



    const queryString4 = "INSERT INTO fuel_expenses (bus_id, amount, fuel_count, date) VALUES (?,?,?,?)"
    

    con.query(queryString4, [bus_id, amount, fuel_count, date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Expense entered successfully'
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

//--------------->>>>>>>> make bus repair charges

module.exports.makeRepairExpenses = (req, res, next) => {
  var bus_id = req.body.bus_id;
  var amount = req.body.amount;
  var status = req.body.status;
  var date = req.body.date;



    const queryString5 = "INSERT INTO repair_expenses (bus_id, amount, status, date) VALUES (?,?,?,?)"
    

    con.query(queryString5, [bus_id, amount, status, date], (err, results, fields) => {  
        
        if(results){
            res.json({
            'success': true,
            'succmessage': 'Expense entered successfully'
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

//--------------->>>>>>>> get all passengers fee amounts
module.exports.getAllIncomes= (req, res, next) => {

  const depositedDitails = "SELECT * FROM deposit_payments"

  con.query(depositedDitails, (err, results, fields)=>{

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
          'Details': results
        });

      }
      else{
        res.json({
          'success': false,
          'message1': 'no any deposits'
        });
      }
  })
}

