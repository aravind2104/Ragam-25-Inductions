const Book = require('../models/bookModel');
const Counter = require('../models/sequenceModel');

exports.addBook = async (req, res) => {
    const {title, author, genre, published_year, available_copies} = req.body;
    try {
        const newBook = new Book({title, author, genre, published_year, available_copies});
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({message: "Error in adding book", error: error.message});
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if(req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(200).json(books);
        }
        else{
            res.render('books', {books});
        }
    } catch (error) {
        res.status(500).json({message: "Error in fetching books", error: err});
    }
};

exports.getBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const book = await Book.findById(id);
        if(!book) {
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json(book);
    } catch(error) {
        res.status(500).json({message: "Error in fetching book", error: error.message});
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(404).json({message: "Book not found"});
        }
        const {title, author, genre, published_year, available_copies} = req.body;
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.published_year = published_year;
        book.available_copies = available_copies;
        await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({message: "Error in updating book", error: error.message});
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) {
            return res.status(404).json({message: "Book not found"});
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({message: "Error in deleting book", error: error.message});
    }
};