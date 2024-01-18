const Folder = require('../models/folder');
const Note = require('../models/note');

module.exports = {
  index,
  new: newFolder,
  show,
  create
}

function newFolder(req,res){
  res.render('folders/new');
}

async function index(req, res){
  const folder = await Folder.find({});
  const notes = await Note.find({});
  const updatedNotes = notes.filter(n => !n.folder)
  res.render('folders/index', {folder, notes:updatedNotes});
}

async function show(req, res){
  const folder = await Folder.findById(req.params.id);
  const notes = await Note.find({folder:folder._id});
  res.render('folders/show', {folder, notes});
}

async function create(req, res){
  req.body.user = req.user._id;
  try {
    const folder = await Folder.create(req.body);
    res.redirect('/folders');
  } catch (err){
    console.log(err);
    res.render('folders/new');
  }
}
