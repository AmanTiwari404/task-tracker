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
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (username) {
      getTasks(username).then(setTasks);
    }
  }, [username]);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
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

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Pending' && !task.completed);

    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  if (!username) return <Login onLogin={handleLogin} />;

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{username}'s Task Tracker</h1>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
      </div>
      <TaskForm onAdd={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '15px', padding: '10px', width: '100%', borderRadius: '6px', border: '1px solid #ccc' }}
      />

      <TaskList
        tasks={filteredTasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );

}

export default App;
