const getHealthCheck = require('./controllers/c_healthCheck');
const getTopics = require('./controllers/c_topics');

const express = require('express');
const db = require('./db/connection');

const app = express();

app.get('/', getHealthCheck);
app.get('/api/topics', getTopics)

module.exports = app;
