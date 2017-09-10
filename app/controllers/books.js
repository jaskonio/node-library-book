
const Book = require('../models/book');
function getBooks (req, res){
  console.log('GET /api/books');
  console.log(req.params);

  Book.find({}, (err, books) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!books) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({books})
  })

}

function getBook (req, res){
  // get book by Id
  console.log('GET /api/book/:bookId');
  console.log(req.params);

  let bookId = req.params.bookId
  Book.findById(bookId, (err, docs) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!docs) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ docs})

  })

}

function getBookByName(req, res){
  console.log('GET /api/book/:bookName');
  console.log(req.params);

  let bookName = req.params.bookName
  Book.find({"name": bookName}, (err, book) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (book.length == 0) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ book})

  })
}


function updateBook (req, res){
  res.send("a")

}
function deleteBook (req, res){
  res.send("a")

}
function saveBook (req, res){
    console.log('POST /api/book');
    console.log(req.body);

    let book = new Book()
    book.name = req.body.name
    book.size = req.body.size
    book.ext = req.body.ext
    book.description = req.body.description

    book.save( (err, bookStored) =>{
      if (err) return res.status(500).send({ message: `Error al guardar en la base de datos ${err}`})

      res.status(200).send({book: bookStored})
    })

}

module.exports = {
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  saveBook,
  getBookByName
}
