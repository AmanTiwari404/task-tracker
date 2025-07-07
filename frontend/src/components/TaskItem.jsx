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
          <h3>
            {task.title}
            <span style={{
              fontSize: '0.8rem',
              marginLeft: '10px',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor:
                task.priority === 'High' ? '#f44336' :
                task.priority === 'Medium' ? '#ff9800' : '#4caf50',
              color: '#fff'
            }}>
              {task.priority}
            </span>
          </h3>

          <p>{task.description}</p>

          {task.dueDate && (
            <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          )}

          {task.category && (
            <p>
              <strong>Category:</strong>{' '}
              <span style={{
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: '#0077ff',
                color: '#fff',
                fontSize: '0.75rem'
              }}>
                {task.category}
              </span>
            </p>
          )}

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
