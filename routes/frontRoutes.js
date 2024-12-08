const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

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

module.exports=router;