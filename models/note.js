const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  header: {
    type: String,
     required: true,
     default: ''
    },
  body:{
    type: String,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

module.exports = mongoose.model('Note', noteSchema);