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
  res.render('folders/index', {folder});
}

async function show(req, res){
  const folder = await Folder.findById(req.params.id);
  const note = await Note.find({});
  res.render('folders/show', {folder, note});
}

async function create(req, res){
  try {
    const folder = await Folder.create(req.body);
    res.redirect('/folders');
  } catch (err){
    console.log(err);
    res.render('folders/new');
  }
}
