const getHealthCheck = require('./controllers/c_healthCheck');
const getTopics = require('./controllers/c_topics');
const getArticles = require('./controllers/c_articles');
const getUsers = require('./controllers/c_users');

const express = require('express');

const app = express();

app.get('/', getHealthCheck);
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/users', getUsers);

module.exports = app;
