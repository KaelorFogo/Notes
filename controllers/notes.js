const Note = require("../models/note");
const Folder = require("../models/folder");

module.exports = {
  create,
  show,
  new: newNote,
  update,
  delete: deleteNote
};

async function deleteNote(req, res) {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!note) {
      return res.redirect('/folders');
    }
    res.redirect('/folders');
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res){
  if(req.body.folder == "null"){
    delete req.body.folder
  }
  const folder = await Folder.findById(req.body.folder);
  try {
    const updatedNote = await Note.findOneAndUpdate(
      {_id: req.params.id, user: req.user._id},
      // update object with updated properties
      req.body,
      // options object {new: true} returns updated doc
      {new: true}
    );
    if(!folder) updatedNote.folder = undefined;
    await updatedNote.save();
    if(folder) return res.redirect(`/folders/${folder._id}`);
    res.redirect('/folders');
  } catch (e) {
    console.log(e.message);
    return res.redirect('/books');
  }
}

async function newNote(req, res) {
  const folder = await Folder.findById(req.params.id);
  const indexFolder = await Folder.find({});
  const notes = await Note.find({});
  const updatedNotes = notes.filter(n => !n.folder)
  res.render("notes/new", { folder, indexFolder, indexNotes:updatedNotes });
}

async function show(req, res){
    const folders = await Folder.find({});
    const note = await Note.findById(req.params.id);
    const indexFolder = await Folder.find({});
  const notes = await Note.find({});
  const updatedNotes = notes.filter(n => !n.folder)
    res.render('notes/show', {note, folders, indexFolder, indexNotes:updatedNotes});
}

async function create(req, res) {
  req.body.user = req.user._id;
  try {
    const folder = await Folder.findById(req.body.folder);
    const note = await Note.create(req.body);
    if (folder) res.redirect(`/folders/${folder._id}`);
    res.redirect("/folders");
  } catch (err) {
    console.log(err);
    res.render("folders");
  }
}
