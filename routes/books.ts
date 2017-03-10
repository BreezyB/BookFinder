import * as express from 'express';

import Book from '../models/book';
let router = express.Router();


router.post('/AddBook', (req, res, next) => {

  let book:any = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  book.site_tag = req.body.site_tag;
  book.save(function(err, newBook){
    if(err){
      return next(err);
    }
    res.json({message: "Thank you for sharing this book!", bookId: book._id})
  }).catch((err) => {
    res.status(500);
  });
});

// GET all Drop Sites

router.get('/', (req, res) => {
  Book.find().then((books)=> {
      res.json(books);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

router.get('/:books', (req, res) => {
  Book.find({ site_tag: req.params['id'] }).then((books)=> {
      res.json(books);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

// Get a single sites by id
router.get('/:id', (req, res) => {
  Book.findById(req.params['id']).then((book) => {
    res.json(book);
  });
});

// Update existing site
router.post('/:id', (req, res) => {
  let bookId = req.params.id;

  Book.findById(bookId).then((book) => {
    book.title = req.body.title;
    book.author = req.body.author;
    // save updated animal
    book.save().then((updatedBook) => {
      res.json(updatedBook);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }).catch(() => {
    res.sendStatus(404);
  });
});


// Delete a site (admin only)
router.delete('/:id', (req, res) => {
  let bookId = req.params.id;
  Book.remove({_id:bookId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;
