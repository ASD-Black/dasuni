require('./config/config')
require('./models/db')
require('./config/passportConfig')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const rtsIndex = require('./routes/index.router')

var PORT = process.env.PORT || 4000

var app = express()

//middleware
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use('/api', rtsIndex)

//globly error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

//start server
app.listen(PORT, function(){
    console.log(`Srever started at port : ${PORT}`)
})

