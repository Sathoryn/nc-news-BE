const cors = require('cors')
const getHealthCheck = require('./controllers/c_healthCheck');
const getTopics = require('./controllers/c_topics');
const { getNoBodyArticles, getArticleById, putArticleVotes } = require('./controllers/c_articles');
const { getCommentsbyArticleId, postCommentToArticle, deleteComment } = require('./controllers/c_comments');
const getUsers = require('./controllers/c_users');

const { handle500s, handleCustomErrors, handlePSQLErrors } = require('./controllers/c_errors');



const express = require('express');
const app = express();

app.use(cors())

app.use('/api', express.static('public'));

app.use(express.json());

app.get('/', getHealthCheck);

app.get('/api/topics', getTopics);

app.get('/api/articles', getNoBodyArticles);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getCommentsbyArticleId);

app.post('/api/articles/:article_id/comments', postCommentToArticle);

app.put('/api/articles/:article_id', putArticleVotes);

app.delete('/api/comments/:comment_id', deleteComment);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handle500s);

module.exports = app;

