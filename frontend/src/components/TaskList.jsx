import React from 'react';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div className="task-list">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <TaskItem
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
