const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  priority: { type: String, default: 'Medium' },
  category: { type: String, default: 'General' },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
