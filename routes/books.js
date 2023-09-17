const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file_upload')
const http = require('http')


const library = {
    books: [],
}

class Book {
    constructor(title = "", description = "", authors = "", favorite = false, fileCover = "", fileName = "", fileBook = "", id = uuid()) {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
        this.id = id
    }
}


router.get('/api/books', (req, res) => {
    res.json({ books } = library)
})

router.get('/api/books/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

router.post('/api/books', (req, res) => {
    const { books } = library
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)

    res.status(201) // при создании новых записей принято возвращать 201
    res.json(newBook)
})

router.put('/api/books/:id', (req, res) => {
    const { books } = library
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const { id } = req.params

    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
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
router.put('/api/books/:id/upload', fileMulter.single('book-file'), (req, res) => {
    const { books } = library
    const { id } = req.params

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
router.get('/api/books/:id/download', (req, res) => {
    const { id } = req.params
    const idx = library.books.findIndex(el => el.id === id)
    res.download(library.books[idx].fileBook)
})

router.delete('/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        books.splice(idx, 1)
        res.json("Ok")
    } else {
        res.status(404)
        res.json('404 | not found')
    }
})

// api end

router.get('/', (req, res) => {
    res.redirect('/index')
});

[1, 2, 3].map(el => {
    const newBook = new Book(`title ${el}`, `desc ${el}`, `authors ${el}`, true, `cover ${el}`, `name ${el}`, `book ${el}`)
    library.books.push(newBook)
})

//список всех книг
router.get('/index', (req, res) => {
    const { books } = library
    res.render('library/index', {
        title: "Список всех книг",
        books: books,
    })
})

//информация по конкретной книге
router.get('/view/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    // увеличение счетчика просмотров
    // http.post(`http://localhost:3002/counter/${id}/incr`)

    // получение счетчика просмотров
    http.get(`http://localhost:3002/counter/${id}`, (res) => {
        if (res.statusCode !== 200) {
            // такой книги нет TO DO
        }
        res.setEncoding('utf8')
        let rowData = ''
        res.on('data', (chunk) => rowData += chunk)
        res.on('end', () => {
            let parseData = JSON.parse(rowData)
            res.render("library/view", {
                title: "Book | view",
                books: books[idx],
                bookViewCount: parseData.redisCnt
            });
        })
        res.on('error', err => {
            console.log(`Ошибка  ${err}`)
        })
    })

    // res.render("library/view", {
    //     title: "Book | view",
    //     books: books[idx],
    //     // передать counter на отрисовку 
    // });
})

//создание книги get
router.get('/create', (req, res) => {
    res.render("library/create", {
        title: "Book | create",
        books: {},
    });
})

//создание книги post
router.post('/create', (req, res) => {
    const { books } = library;
    const { title, description, authors } = req.body;

    const newBook = new Book(title, description, authors);
    books.push(newBook);

    res.redirect('/index')
})

//редактирование книги get
router.get('/update/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    res.render("library/update", {
        title: "Book | view",
        books: books[idx],
    });
})

//редактирование книги post
router.post('/update/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const { title, description, authors } = req.body
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }
    books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
    }
    res.redirect(`/view/${id}`)
})

//удаление книги post
router.post('/delete/:id', (req, res) => {
    const { books } = library
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    books.splice(idx, 1)
    res.redirect(`/index`)
})



module.exports = router