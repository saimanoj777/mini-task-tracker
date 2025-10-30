import React, { useState } from 'react';
import { createTask } from '../api';

export default function TaskForm({ onSaved }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [due_date, setDueDate] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!title) return alert('Title required');
    await createTask({ title, description: desc, priority, due_date });
    setTitle(''); setDesc(''); setDueDate(''); setPriority('Medium');
    onSaved && onSaved();
  }

  return (
    <form onSubmit={submit} className="bg-white shadow rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold">Add Task</h3>
      <input className="border rounded w-full p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border rounded w-full p-2" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <div className="flex gap-3">
        <select className="border rounded p-2 flex-1" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input className="border rounded p-2 flex-1" type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" type="submit">Add Task</button>
    </form>
  );
}