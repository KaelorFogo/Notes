const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const notesCtrl = require('../controllers/notes');

router.get('/new', ensureLoggedIn, notesCtrl.new);

router.post('/', ensureLoggedIn, notesCtrl.create);

module.exports = router;
