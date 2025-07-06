const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get tasks
router.get('/:username', async (req, res) => {
  const tasks = await Task.find({ username: req.params.username });
  res.json(tasks);
});

// Add task
router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  const saved = await newTask.save();
  res.json(saved);
});

// Update task
router.put('/:id', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
