const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
    constructor( title = "", descripton = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
        this.title = title
        this.descripton = descripton
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName - fileName
        this.id = id
    }
}

const store = {
    library: [],
}

const user = {
    id: 1,
    mail: "test@mail.ru"
}

const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {
    res.status(201)
    res.json(user)
})

app.get('/api/books', (req, res) => {
    res.json({library} = store)
})

app.get('/api/books/:id', (req, res) => {
    const {library} = store
    const {id} = req.params
    const idx = library.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(library[idx])
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

app.post('/api/books', (req, res) => {
    const {library} = store
    const {title, descripton, authors, favorite, fileCover, fileName} = req.body

    const newBook = new Book(title, descripton, authors, favorite, fileCover, fileName)
    library.push(newBook)
    
    res.status(201) // при создании новых записей принято возвращать 201
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {library} = store
    const {title, descripton, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params

    const idx = library.findIndex(el => el.id === id)

    if (idx !== -1) {
        library[idx] = {
            ...library[idx],
            title,
            descripton,
            authors,
            favorite,
            fileCover,
            fileName,
        }
        res.json(library[idx])
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {library} = store
    const {id} = req.params
    const idx = library.findIndex(el => el.id === id)
    if (idx !== -1) {
        library.splice(idx, 1)
        res.json("Ok")
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => { // запуск приложения
    console.log(`Server Listening on PORT ${PORT}`)
}) 