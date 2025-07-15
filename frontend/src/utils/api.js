const API_BASE = process.env.REACT_APP_API_BASE 

export const getTasks = async (username) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/${username}`, {
    headers: { Authorization: token }
  });
  return await res.json();
};

export async function addTask(task) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  });
}
