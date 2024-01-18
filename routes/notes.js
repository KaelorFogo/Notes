const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn");
const notesCtrl = require("../controllers/notes");

router.get("/folders/:id/notes/new", ensureLoggedIn, notesCtrl.new);

router.get('/notes/new', notesCtrl.new);

router.post("/notes", ensureLoggedIn, notesCtrl.create);

module.exports = router;
