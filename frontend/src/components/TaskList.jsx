import React, { useState } from 'react';
import { patchTask } from '../api';

export default function TaskList({ tasks, onRefresh, setFilters }) {
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  function applyFilters() {
    const f = {};
    if (statusFilter) f.status = statusFilter;
    if (priorityFilter) f.priority = priorityFilter;
    setFilters(f);
  }

  async function markDone(id) {
    await patchTask(id, { status: 'Done' });
    onRefresh && onRefresh();
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <div className="flex gap-3">
        <select className="border p-2 rounded flex-1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <select className="border p-2 rounded flex-1" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button className="bg-gray-800 text-white px-3 py-2 rounded" onClick={applyFilters}>Apply</button>
      </div>

      <div className="divide-y">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-center py-6">No tasks available</div>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">{t.title}</div>
                  <div className="text-sm text-gray-600">Due: {t.due_date || '—'} • {t.status}</div>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${t.priority === 'High' ? 'bg-red-100 text-red-700' : t.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{t.priority}</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">{t.description}</p>
              {t.status !== 'Done' && (
                <button onClick={() => markDone(t.id)} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">Mark Done</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}