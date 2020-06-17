require('./config/config')
require('./models/db')
require('./config/passportConfig')
const mysql = require('mysql')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const rtsIndex = require('./routes/index.router')
const adminRouter = require('./routes/admin_panel.router')

var PORT = process.env.PORT || 3000

var app = express()

//middleware
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use('/api', rtsIndex)
app.use('/admin',adminRouter)

//globly error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

//databse connection 
var con = mysql.createConnection({
    host: 'shuttle.ctrlvext8ekc.us-east-2.rds.amazonaws.com', // ip address of server running mysql
    user: 'root', // user name to your mysql database
    password: 'root942632126',// corresponding password
    database: 'shuttle_db'
    //insecureAuth : true,
  });

  var con_sliitDb = mysql.createConnection({
    host: 'shuttle.ctrlvext8ekc.us-east-2.rds.amazonaws.com', // ip address of server running mysql
    user: 'root', // user name to your mysql database
    password: 'root942632126',// corresponding password
    database: 'sliit'
    //insecureAuth : true,
  });

  con.connect(function(err) {
    if(!err){
        console.log('SQL db(shuttle_db) connection succeeded..!')
        global.shuttle_db = con;
    } else{
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2))
    }
  });

  con_sliitDb.connect(function(err) {
    if(!err){
        console.log('SQL db(sliit) connection succeeded..!')
        global.student_db = con_sliitDb;
    } else{
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2))
    }
  });


//start server
app.listen(PORT, function(){
    console.log(`Srever started at port : ${PORT}`)
})

