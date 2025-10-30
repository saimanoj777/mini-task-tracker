const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';


export async function fetchTasks(filters) {
const params = new URLSearchParams(filters || {});
const res = await fetch(`${BASE}/tasks?` + params.toString());
return res.json();
}


export async function createTask(payload) {
const res = await fetch(`${BASE}/tasks`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return res.json();
}


export async function patchTask(id, body) {
const res = await fetch(`${BASE}/tasks/${id}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
});
return res.json();
}


export async function fetchInsights() {
const res = await fetch(`${BASE}/insights`);
return res.json();
}