const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const foldersCtrl = require('../controllers/folders');

router.get('/', ensureLoggedIn, foldersCtrl.index);

// router.get('/:id/notes/new', foldersCtrl.new);

router.get('/new', ensureLoggedIn, foldersCtrl.new);

router.get('/:id', foldersCtrl.show);

router.post('/', ensureLoggedIn, foldersCtrl.create);

module.exports = router;
