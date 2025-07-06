// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  username: String,
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
