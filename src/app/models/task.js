const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  preprocessed_text: {
    type: String,
  },
  analysis_type: {
    type: String,
  },
  result: {
    type: JSON,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = (mongoose.model('Task', taskSchema)) || (mongoose.models.Task);
