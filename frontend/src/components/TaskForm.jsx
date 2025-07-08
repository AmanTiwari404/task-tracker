import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !priority || !category) return;

    onAdd({
      title,
      description,
      priority,
      dueDate,
      category,
      completed: false
    });

    setTitle('');
    setDescription('');
    setPriority('');
    setDueDate('');
    setCategory('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option disabled value="">Select Priority</option>
        <option value="High">🔥 High</option>
        <option value="Medium">⚖️ Medium</option>
        <option value="Low">🧊 Low</option>
      </select>

      <label>Select Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option disabled value="">Select Category</option>
        <option value="General">📌 General</option>
        <option value="Work">💼 Work</option>
        <option value="Personal">🏠 Personal</option>
        <option value="Study">📚 Study</option>
        <option value="Fitness">🏋️ Fitness</option>
      </select>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Task
      </motion.button>
    </form>
  );
};

export default TaskForm;
