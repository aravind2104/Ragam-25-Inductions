const express = require('express');
const bookController = require('../controllers/bookController');
const authenticator = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.post('/books', authenticator, bookController.addBook);
router.get('/books/:id', bookController.getBook);
router.put('/books/:id', authenticator, bookController.updateBook);
router.delete('/books/:id', authenticator, bookController.deleteBook);

module.exports=router;