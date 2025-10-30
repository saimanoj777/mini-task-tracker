const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db');


const tasksRouter = require('./routes/tasks');
const insightsRouter = require('./routes/insights');


const app = express();
const PORT = process.env.PORT || 4000;


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/tasks', tasksRouter);
app.use('/insights', insightsRouter);


app.get('/', (req, res) => res.json({ ok: true }));


app.listen(PORT, () => {
console.log(`Backend listening on http://localhost:${PORT}`);
});