const Note = require('../models/note');

module.exports = {
  create,
  new: newNote
}

async function newNote(req, res){
  res.render('notes/new');
}

async function create(req, res){
  try {
    const note = await Note.create(req.body);
    res.redirect('/folders');
  } catch (err){
    console.log(err);
    res.render('folders/new');
  }
}

