const getHealthCheck = require('./controllers/c_healthCheck');
const getTopics = require('./controllers/c_topics');
const { getNoBodyArticles, getArticleById } = require('./controllers/c_articles');
const {getCommentsbyArticleId, postCommentToArticle} = require ('./controllers/c_comments')

const getUsers = require('./controllers/c_users');
const db = require('./db/connection');

const express = require('express');
const app = express();
app.use(express.json());

app.get('/', getHealthCheck);

app.get('/api/topics', getTopics);

app.get('/api/articles', getNoBodyArticles);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id',getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsbyArticleId)

app.post('/api/articles/:article_id/comments', postCommentToArticle)


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
      res.status(200).send({ updatedArticle: rows[0] });
    });
});

app.get('/api/comments/:comment_id', (req, res) => {
  const { comment_id } = req.params;
  return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [comment_id]).then(({ rows }) => {
    res.status(204).send({ comment: rows[0] });
  });
});

module.exports = app;
