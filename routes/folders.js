const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const notesCtrl = require('../controllers/notes');

router.get('/notes', ensureLoggedIn, notesCtrl.index);

module.exports = router;
