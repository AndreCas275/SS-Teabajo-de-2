const { Router } = require('express');
const fs = require('fs')
const router = Router();
const uuid = require('uuid/v4')

const json_book = fs.readFileSync('src/books.json', 'utf-8')
let books = JSON.parse(json_book);

router.get('/', (req, res) => {
    res.render('index', { libritos: books })
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry')
})
router.post('/new-entry', (req, res) => {
    const { title, author, image, description } = req.body;
    if (!title || !author || !image || !description) {
        res.status(404).send('404 Falatn datos')
    }
    let newBook = {
        id: uuid(),
        title,
        author,
        image,
        description
    }
    books.push(newBook);
    const jsonBooks = JSON.stringify(books)
    fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');

    res.redirect('/')
})

router.get('/borrar/:id', (req, res) => {
    books = books.filter(libritos => libritos.id != req.params.id)
    const jsonBooks = JSON.stringify(books)
    fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');
    res.redirect('/')
})

module.exports = router;