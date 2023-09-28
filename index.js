const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const MongoURL = process.env.MongoURL;

const loginApiRoute = require('./routes/loginApi')
const booksApiRoute = require('./routes/books')
const error404 = require('./middleware/err404');



const app = express()
app.use(express.json())

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/api/user/login', loginApiRoute)
app.use('/', booksApiRoute)

app.use(error404)

// app.listen(PORT, () => { // запуск приложения
//     console.log(`LIBRARY Server Listening on PORT ${PORT}`)
// }) 

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB)
        app.listen(PORT)
        console.log(`LIBRARY Server Listening on PORT ${PORT}`)
    } catch (e) {
        console.log(`DB Conn or LIBRARY start is incorrect, ERROR: ${e}`)
    }
}

start(PORT, MongoURL);