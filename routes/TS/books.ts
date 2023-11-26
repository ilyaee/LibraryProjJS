interface Book {
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    fileCover: string,
    fileName: string,
    fileBook: string,
    id: string
}

abstract class BooksRepository {
    createBook(book:Book) {} //создание книги
    getBook(id:string) {} //получение книги по id
    getBooks() {} //получение всех книг
    updateBook(id:string) {} //обновление книги
    deleteBook(id:string) {} //удаление книги
}