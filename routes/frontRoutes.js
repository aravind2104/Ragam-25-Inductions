const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const authenticator = require('../middleware/authMiddleware');
const Book = require('../models/bookModel');

router.get('/add-Book', (req, res) => {
    res.render('addBook');
});
router.get('/books', bookController.getAllBooks);
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/edit-book/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Pass the book data to the EJS template
        res.render('editBook', { book });  // 'editBook' is the name of your EJS file
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Error fetching book for editing', error: error.message });
    }
});
module.exports=router;