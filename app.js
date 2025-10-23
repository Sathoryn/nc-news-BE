const getHealthCheck = require('./controllers/c_healthCheck');
const getTopics = require('./controllers/c_topics');
const { getNoBodyArticlesByDate, getArticleById } = require('./controllers/c_articles');
const getUsers = require('./controllers/c_users');
const db = require('./db/connection');

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', getHealthCheck);

app.get('/api/topics', getTopics);

app.get('/api/articles', getNoBodyArticlesByDate);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id', (req, res) => {
  const { article_id } = req.params;
  return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then(({ rows }) => {
    res.status(200).send({ article: rows[0] });
  });
});

app.get('/api/articles/:article_id/comments', (req, res) => {
  const { article_id } = req.params;
  return db
    .query('SELECT * FROM comments WHERE article_id = $1', [article_id])
    .then(({ rows }) => {
      const sortedByDateRows = rows.sort((commentA, commentB) => {
        return new Date(commentB.created_at) - new Date(commentA.created_at);
      });
      return sortedByDateRows;
    })
    .then((body) => {
      res.status(200).send({ comments: body });
    });
});

app.post('/api/articles/:article_id/comments', (req, res) => {
  const { article_id } = req.params;
  const { author, body } = req.body;

  return db
    .query(
      `
  INSERT INTO comments 
  (article_id,author,body) 
  VALUES
  ($1,$2,$3) RETURNING *`,
      [article_id, author, body]
    )
    .then(({ rows }) => {
      res.status(201).send({ comment: rows[0] });
    });
});

app.put('/api/articles/:article_id', (req, res) => {
  const { increaseVotes } = req.body;
  const { article_id } = req.params;

  return db
    .query(
      `
    UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`,
      [increaseVotes, article_id]
    )
    .then(({ rows }) => {
      res.status(200).send({ updatedArticle : rows[0] });
    })
});

module.exports = app;



