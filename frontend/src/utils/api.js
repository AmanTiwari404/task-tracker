const API_BASE = 'https://task-tracker-3hvh.onrender.com/api/tasks'; 

export async function getTasks(username) {
  const res = await fetch(`${API_BASE}/${username}`);
  return res.json();
}

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
