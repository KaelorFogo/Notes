const Folder = require('../models/folder');
const Note = require('../models/note');

module.exports = {
  index,
  new: newFolder,
  create
}

function newFolder(req,res){
  res.render('folders/new');
}

async function index(req, res){
  const folder = await Folder.find({});
  res.render('folders/index', {folder});
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
