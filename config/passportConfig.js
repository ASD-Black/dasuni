const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

var User = mongoose.model('User')

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) =>{
            User.findOne({ email: username },
                (err, user) => {
                    if(err)
                        return done(err);
                    //unknown user
                    else if(!user)
                        return done(null, false, { message: 'Not a registered user'})
                    // wrong password
                    else if(!user.varifyPassword(password))
                        return done(null, false, { message: 'Wrong password'})
                    // success authentication
                    else
                        return done(null, user)
                })
        })
)