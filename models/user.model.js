const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'first name can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'last name can\'t be empty'
    },
    email: {
        type: String,
        required: 'email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'password can\'t be empty',
        minlength: [6, 'Password must be atleast 6 character long']
    },
    saltSecret: String
})

//custom validation from email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


//events
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) =>{
            this.password = hash
            this.saltSecret = salt
            next()
        })
    })
})

// Methods(instent)
userSchema.methods.varifyPassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        })
}

mongoose.model('User', userSchema)