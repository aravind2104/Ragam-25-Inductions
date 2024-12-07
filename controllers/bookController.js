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