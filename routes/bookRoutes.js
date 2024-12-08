const express = require('express');
const bookController = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.post('/books', auth.authenticate, bookController.addBook);
router.get('/books/:id', bookController.getBook);
router.put('/books/:id', auth.authenticate, auth.authorize('Admin'), bookController.updateBook);
router.delete('/books/:id', auth.authenticate, auth.authorize('Admin'), bookController.deleteBook);

module.exports=router;