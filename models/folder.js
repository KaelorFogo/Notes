const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchemma = new Schema({
  title: {type: String, required: true},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
});

module.exports = mongoose.model("Folder", folderSchemma);