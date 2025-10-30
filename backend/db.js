// db.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');


const DB_FILE = path.join(__dirname, 'data.db');
const MIGRATION_FILE = path.join(__dirname, 'migrations', '001_create_tasks.sql');


const db = new sqlite3.Database(DB_FILE, (err) => {
if (err) return console.error('DB open error', err);
});


function runMigrations() {
const sql = fs.readFileSync(MIGRATION_FILE, 'utf8');
db.exec(sql, (err) => {
if (err) {
console.error('Migration error:', err);
process.exit(1);
} else {
console.log('Migrations applied.');
process.exit(0);
}
});
}


if (require.main === module) {
if (process.argv.includes('--migrate')) runMigrations();
}


module.exports = db;