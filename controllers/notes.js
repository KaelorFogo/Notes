const Note = require("../models/note");
const Folder = require("../models/folder");

module.exports = {
  create,
  new: newNote,
};

async function newNote(req, res) {
  const folder = await Folder.findById(req.params.id);
  res.render("notes/new", { folder });
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
