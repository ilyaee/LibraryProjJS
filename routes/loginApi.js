const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersDB = require('../models/usersMongo')

const verify = (username, password, done) => {
    usersDB.findOne({username: `${username}`}, (err, user) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        if (user.password !== password) {
            return done(null, false)
        }
        return done(null, user)
    })
}

const options = {
    usernameField: "username",
    passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {

})


const user = {
    id: 1,
    mail: "test@mail.ru"
}

router.post('/login', (req, res) => {
    res.status(201)
    res.json(user)
})

module.exports = router