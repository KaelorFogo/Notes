const Folder = require('../models/folder');
const Note = require('../models/note');

module.exports = {
  index
}

async function index(req, res){
  const folder = await Folder.find({});
  res.render('notes', {folder});
}
