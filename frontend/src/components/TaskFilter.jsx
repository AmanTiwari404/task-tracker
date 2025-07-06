import React from 'react';

const TaskFilter = ({ filter, setFilter, tasks }) => {
  const count = {
    All: tasks.length,
    Completed: tasks.filter(t => t.completed).length,
    Pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="task-filter">
      {['All', 'Completed', 'Pending'].map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f} ({count[f]})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
