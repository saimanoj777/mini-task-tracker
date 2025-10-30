const express = require('express');
const router = express.Router();
const db = require('../db');


// /insights - compute summary
router.get('/', async (req, res) => {
try {
// Use a few SQL aggregates for efficiency
const summary = {};
db.serialize(() => {
db.get(`SELECT COUNT(*) as total FROM tasks`, [], (err, row) => {
if (err) return res.status(500).json({ error: 'DB error' });
summary.total = row.total;


db.all(`SELECT priority, COUNT(*) as cnt FROM tasks GROUP BY priority`, [], (err2, rows) => {
if (err2) return res.status(500).json({ error: 'DB error' });
summary.byPriority = rows;


db.get(`SELECT COUNT(*) as due_soon FROM tasks WHERE due_date IS NOT NULL AND date(due_date) <= date('now','+3 days') AND status != 'Done'`, [], (err3, row3) => {
if (err3) return res.status(500).json({ error: 'DB error' });
summary.due_soon = row3.due_soon;


db.all(`SELECT due_date, COUNT(*) as cnt FROM tasks WHERE due_date IS NOT NULL GROUP BY due_date ORDER BY cnt DESC LIMIT 1`, [], (err4, rows4) => {
summary.busiest_day = rows4 && rows4.length ? { date: rows4[0].due_date, count: rows4[0].cnt } : null;


// Build a simple human-readable "AI-like" sentence
const high = summary.byPriority.find(r => r.priority === 'High');
const highCount = high ? high.cnt : 0;
let sentence = `${summary.total} total tasks.`;
if (summary.total > 0) {
sentence = `You have ${summary.total} tasks — `;
if (highCount > summary.total / 2) sentence += `many are High priority. `;
else sentence += `priority distribution: ${summary.byPriority.map(r => `${r.priority}:${r.cnt}`).join(', ')}. `;
if (summary.due_soon) sentence += `${summary.due_soon} are due within 3 days.`;
}


res.json({ success: true, summary, sentence });
});
});
});
});
});
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to compute insights' });
}
});


module.exports = router;