const API_BASE = process.env.REACT_APP_API_BASE;

// Get all tasks for a user
export const getTasks = async (username) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/${username}`, {
    headers: {
      'Authorization': token
    }
  });
  return await res.json();
};

// Add a task 
export async function addTask(task) {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); 
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ ...task, username }) 
  });
  return await res.json();
}

// Update a task
export async function updateTask(id, updates) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(updates)
  });
  return await res.json();
}

// Delete a task
export async function deleteTask(id) {
  const token = localStorage.getItem('token');
  await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
}
