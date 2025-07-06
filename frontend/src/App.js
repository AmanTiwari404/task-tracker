import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasks, addTask, updateTask, deleteTask } from './utils/api';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (username) {
      getTasks(username).then(setTasks);
    }
  }, [username]);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleAddTask = async (task) => {
    const newTask = await addTask({ ...task, username });
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map(t => (t._id === id ? updated : t)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter(t => t._id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  if (!username) return <Login onLogin={handleLogin} />;

  return (
    <div className="App">
      <h1>{username}'s Task Tracker</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
