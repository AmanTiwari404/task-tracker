import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const handleToggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const handleSave = () => {
    onUpdate(task._id, { title: editedTitle, description: editedDesc });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><small>{new Date(task.createdAt).toLocaleString()}</small></p>
          <div className="actions">
            <button onClick={handleToggleComplete}>
              {task.completed ? 'Mark as Pending' : 'Mark as Done'}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => window.confirm('Delete task?') && onDelete(task._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
