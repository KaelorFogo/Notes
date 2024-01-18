const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const notesCtrl = require("../controllers/notes");

router.get("/folders/:id/notes/new", ensureLoggedIn, notesCtrl.new);

router.get('/notes/new', notesCtrl.new);

router.get('/notes/:id', notesCtrl.show);

router.get('/folders/notes/:id', notesCtrl.show);

router.put('/notes/:id', ensureLoggedIn, notesCtrl.update);

router.post("/notes", ensureLoggedIn, notesCtrl.create);

router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delete);


module.exports = router;
