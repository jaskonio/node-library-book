const express = require('express')
const api = express.Router()
const booksCtrl = require('../controllers/books')

api.get('/books/', booksCtrl.getBooks)
api.get('/book/:bookId', booksCtrl.getBook)
api.get('/book/name/:bookName', booksCtrl.getBookByName)
api.put('/books/', booksCtrl.updateBook)
api.delete('/books/', booksCtrl.deleteBook)
api.post('/book/', booksCtrl.saveBook)


module.exports = api
