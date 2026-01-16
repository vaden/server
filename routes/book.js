const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', bookCtrl.getAllBook);

router.get('/:id', bookCtrl.getOneBook);

router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.post('/', auth, multer, bookCtrl.createBook);

router.post('/:id/rating', auth, bookCtrl.rateBook);

router.put('/:id', auth, multer, bookCtrl.modifyBook);

router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;
