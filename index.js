const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT || 3001

const loginApiRoute = require('./routes/loginApi')
const booksApiRoute = require('./routes/books')
const error404 = require('./middleware/err404')


const app = express()
app.use(express.json())

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/api/user/login', loginApiRoute)
app.use('/', booksApiRoute)

app.use(error404)

app.listen(PORT, () => { // запуск приложения
    console.log(`LIBRARY Server Listening on PORT ${PORT}`)
}) 