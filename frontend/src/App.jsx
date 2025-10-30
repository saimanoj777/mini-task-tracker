import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Insights from './components/Insights';
import { fetchTasks, fetchInsights } from './api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [insights, setInsights] = useState(null);

  async function load() {
    const res = await fetchTasks(filters);
    if (res.success) setTasks(res.tasks);
    const ins = await fetchInsights();
    if (ins.success) setInsights(ins);
  }

  useEffect(() => { load(); }, [filters]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Mini Task Tracker</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <TaskForm onSaved={load} />
          <Insights insights={insights} />
        </div>
        <TaskList tasks={tasks} onRefresh={load} setFilters={setFilters} />
      </div>
    </div>
  );
}