const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file_upload')

const library = {
    books: [],
}

class Book {
    constructor(title = "", descripton = "", authors = "", favorite = false, fileCover = "", fileName = "", fileBook = "", id = uuid()) {
        this.title = title
        this.descripton = descripton
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
        this.id = id
    }
}


router.get('/', (req, res) => {
    res.json({books} = library)
})

router.get('/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

router.post('/', (req, res) => {
    const {books} = library
    const {title, descripton, authors, favorite, fileCover, fileName, fileBook} = req.body

    const newBook = new Book(title, descripton, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)
    
    res.status(201) // при создании новых записей принято возвращать 201
    res.json(newBook)
})

router.put('/:id', (req, res) => {
    const {books} = library
    const {title, descripton, authors, favorite, fileCover, fileName, fileBook} = req.body
    const {id} = req.params

    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            descripton,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        }
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

// загрузка файла книги
router.put('/:id/upload', fileMulter.single('book-file'), (req, res) => {
    const {books} = library
    const {id} = req.params

    const idx = books.findIndex(el => el.id === id)

    //ищем книгу по id
    if (idx !== -1) {
        const fileBook = req.file.path
        books[idx] = {
            ...books[idx],
            fileBook,
        }
        res.status(200)
        res.json(`Файл загружен в ${fileBook}`)
    } else {
        res.status(404)
        res.json('404 | книга с таким id не найдена')
    }
})

// выгрузка файла книги
router.get('/:id/download', (req, res) => {
    const {id} = req.params
    const idx = library.books.findIndex(el => el.id === id)
    res.download(library.books[idx].fileBook)
})

router.delete('/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        books.splice(idx, 1)
        res.json("Ok")
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

module.exports = router