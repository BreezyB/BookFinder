"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var book_1 = require("../models/book");
var router = express.Router();
router.post('/AddBook', function (req, res, next) {
    var book = new book_1.default();
    book.title = req.body.title;
    book.author = req.body.author;
    book.site_tag = req.body.site_tag;
    book.save(function (err, newBook) {
        if (err) {
            return next(err);
        }
        res.json({ message: "Thank you for sharing this book!", bookId: book._id });
    }).catch(function (err) {
        res.status(500);
    });
});
router.get('/', function (req, res) {
    book_1.default.find().then(function (books) {
        res.json(books);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    console.log(req.params['id']);
    book_1.default.find({ site_tag: req.params['id'] }).then(function (books) {
        res.json(books);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.post('/:id', function (req, res) {
    var bookId = req.params.id;
    book_1.default.findById(bookId).then(function (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.save().then(function (updatedBook) {
            res.json(updatedBook);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    }).catch(function () {
        res.sendStatus(404);
    });
});
router.delete('/:id', function (req, res) {
    var bookId = req.params.id;
    book_1.default.remove({ _id: bookId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
exports.default = router;
