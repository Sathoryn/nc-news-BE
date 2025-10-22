const getHealthCheck = require('./controllers/c_healthCheck');
const getTopics = require('./controllers/c_topics');
const getArticles = require('./controllers/c_articles');


const express = require('express');
const db = require('./db/connection');

const app = express();

app.get('/', getHealthCheck);
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)




module.exports = app;
