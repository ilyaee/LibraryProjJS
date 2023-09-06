const express = require('express')

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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { // запуск приложения
    console.log(`Server Listening on PORT ${PORT}`)
}) 