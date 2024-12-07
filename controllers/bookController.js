const Book = require('../models/bookModel');

exports.addBook = async (req, res) => {
    try {
        const {title, author, genre, published_year, available_copies} = req.body;
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
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: "Error in fetching books", error: err});
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
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
        res.status(200).json(book);
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
        res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error in deleting book", error: error.message});
    }
};