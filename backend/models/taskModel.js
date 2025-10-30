const db = require('../db');
const {v4: uuidv4} = require('uuid');

function nowISO() {return new Date().toISOString();}

const TaskModel = {
    create: (task) => new Promise((resolve, reject) => {
        const id = uuidv4();
        const created_at = nowISO();
        const updated_at = created_at;
        const stmt = db.prepare(`INSERT INTO tasks
            (id, title, description, priority, status, due_date, created_at, updated_at)
            VALUES (?,?,?,?,?,?,?,?)`);
        stmt.run(
            id,
            task.title,
            task.description || null,
            task.priority || 'Medium',
            task.status || 'Open',
            task.due_date || null,
            created_at,
            updated_at,
            function (err) {
                if (err) return reject(err);
                resolve({ id, ...task, created_at, updated_at });
            }
        );
    }),

    list: (filters = {}) => new Promise((resolve, reject) => {
        const clauses = [];
        const params = [];
        if (filters.status) { clauses.push('status = ?'); params.push(filters.status); }
        if (filters.priority) { clauses.push('priority = ?'); params.push(filters.priority); }
        let sql = 'SELECT * FROM tasks';
        if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ');
        sql += ' ORDER BY due_date IS NULL, due_date ASC';
        db.all(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    }),


    update: (id, patch) => new Promise((resolve, reject) => {
        const fields = [];
        const params = [];
        if (patch.priority) { fields.push('priority = ?'); params.push(patch.priority); }
        if (patch.status) { fields.push('status = ?'); params.push(patch.status); }
        if (fields.length === 0) return reject(new Error('No updatable fields provided'));
        fields.push('updated_at = ?'); params.push(nowISO());
        params.push(id);
        const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
        db.run(sql, params, function(err) {
            if (err) return reject(err);
            resolve({ changes: this.changes });
        });
    }),


    getById: (id) => new Promise((resolve, reject) => {
        db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    })
};


module.exports = TaskModel;