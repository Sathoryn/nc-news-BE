const { readCommentsByArticleId, createCommentToArticle } = require('../models/m_comments');

const getCommentsbyArticleId = (req, res) => {
  const { article_id } = req.params;

  readCommentsByArticleId(article_id).then((comments) => {
    res.status(200).send({ comments: comments });
  });
};

const postCommentToArticle = (req, res) => {
  const { article_id } = req.params;
  const { author, body } = req.body;

  createCommentToArticle(article_id, author, body).then((comment) => {
    res.status(201).send({ comment: comment[0] });
  })
};

module.exports = { getCommentsbyArticleId, postCommentToArticle };
