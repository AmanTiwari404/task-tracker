import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasks, addTask, updateTask, deleteTask } from './utils/api';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [dueFilter, setDueFilter] = useState('All');
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    if (username) getTasks(username).then(setTasks).catch(console.error);
  }, [username]);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername('');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  };

  const handleAddTask = async (task) => {
    const newTask = await addTask({ ...task, username });
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const isDueToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isOverdue = (dateStr) => new Date(dateStr) < new Date();
  const isUpcoming = (dateStr) => new Date(dateStr) > new Date();

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Pending' && !task.completed);

    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    let matchesDue = true;
    if (dueFilter === 'Today') matchesDue = task.dueDate && isDueToday(task.dueDate);
    if (dueFilter === 'Upcoming') matchesDue = task.dueDate && isUpcoming(task.dueDate);
    if (dueFilter === 'Overdue') matchesDue = task.dueDate && isOverdue(task.dueDate);

    return matchesStatus && matchesSearch && matchesCategory && matchesPriority && matchesDue;
  });

  if (!username) {
    return (
      <div>
        <AuthForm onAuth={handleLogin} mode={authMode} />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('register')}>Register here</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setAuthMode('login')}>Login here</button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{username}'s Task Tracker</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={toggleDarkMode}>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <TaskForm onAdd={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      >
        <option value="All">All Categories</option>
        <option value="Work">💼 Work</option>
        <option value="Personal">🏠 Personal</option>
        <option value="Study">📚 Study</option>
        <option value="Fitness">🏋️ Fitness</option>
        <option value="General">📌 General</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      >
        <option value="All">All Priorities</option>
        <option value="High">🔥 High</option>
        <option value="Medium">⚖️ Medium</option>
        <option value="Low">🧊 Low</option>
      </select>

      <select
        value={dueFilter}
        onChange={(e) => setDueFilter(e.target.value)}
        style={{ marginBottom: '15px', padding: '10px', width: '100%' }}
      >
        <option value="All">All Due Dates</option>
        <option value="Today">📅 Due Today</option>
        <option value="Upcoming">⏳ Upcoming</option>
        <option value="Overdue">⚠️ Overdue</option>
      </select>

      <TaskList tasks={filteredTasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
