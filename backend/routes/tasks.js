const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');


// Create task
router.post('/', async (req, res) => {
    try {
        const { title, description, priority, due_date, status } = req.body;
        if (!title || typeof title !== 'string') return res.status(400).json({ error: 'Title is required' });
        if (priority && !['Low','Medium','High'].includes(priority)) return res.status(400).json({ error: 'Invalid priority' });
        if (status && !['Open','In Progress','Done'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
        const task = await Task.create({ title, description, priority, due_date, status });
        res.status(201).json({ success: true, task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create task' });
    }
});


// List tasks with optional filters
router.get('/', async (req, res) => {
try {
    const { status, priority } = req.query;
    const tasks = await Task.list({ status, priority });
    res.json({ success: true, tasks });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list tasks' });
    }
});


// Patch task (status / priority)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, priority } = req.body;
        if (priority && !['Low','Medium','High'].includes(priority)) return res.status(400).json({ error: 'Invalid priority' });
        if (status && !['Open','In Progress','Done'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
        const result = await Task.update(id, { priority, status });
        if (result.changes === 0) return res.status(404).json({ error: 'Task not found' });
        const updated = await Task.getById(id);
        res.json({ success: true, task: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});


module.exports = router;