PRAGMA foreign_keys = ON;


CREATE TABLE IF NOT EXISTS tasks (
id TEXT PRIMARY KEY,
title TEXT NOT NULL,
description TEXT,
priority TEXT NOT NULL CHECK (priority IN ('Low','Medium','High')),
status TEXT NOT NULL CHECK (status IN ('Open','In Progress','Done')),
due_date TEXT, -- ISO date string
created_at TEXT NOT NULL,
updated_at TEXT NOT NULL
);


CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);