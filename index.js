const express = require('express')

const loginRoute = require('./routes/login')
const booksRoute = require('./routes/books')
const error404 = require('./middleware/err404')


const app = express()
app.use(express.json())

app.use('/api/user/login', loginRoute)
app.use('/api/books', booksRoute)

app.use(error404)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { // запуск приложения
    console.log(`Server Listening on PORT ${PORT}`)
}) 