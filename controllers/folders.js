const Folder = require('../models/folder');
const Note = require('../models/note');

module.exports = {
  index,
  new: newFolder,
  show,
  create,
  delete: deleteFolder
}

async function deleteFolder(req, res) {
  try {
    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!folder) {
      return res.redirect('/folders');
    }
    res.redirect('/folders');
  } catch (err) {
    console.log(err);
  }
}

async function newFolder(req,res){
  const indexFolder = await Folder.find({});
  const notes = await Note.find({});
  const updatedNotes = notes.filter(n => !n.folder)
  res.render('folders/new', {indexNotes:updatedNotes, indexFolder});
}

async function index(req, res){
  const indexFolder = await Folder.find({});
  const notes = await Note.find({});
  const updatedNotes = notes.filter(n => !n.folder)
  res.render('folders/index', {indexFolder, indexNotes:updatedNotes});
}

async function show(req, res){
  const folder = await Folder.findById(req.params.id);
  const notes = await Note.find({folder:folder._id});
  const indexFolder = await Folder.find({});
  const iNotes = await Note.find({});
  const updatedNotes = iNotes.filter(n => !n.folder)
  res.render('folders/show', {folder, notes, indexNotes:updatedNotes, indexFolder});
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
