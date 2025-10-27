const { readCommentsByArticleId, createCommentToArticle, removeComment } = require('../models/m_comments');

const getCommentsbyArticleId = (req, res) => {
  const { article_id } = req.params;

  return readCommentsByArticleId(article_id).then((comments) => {
    res.status(200).send({ comments: comments });
  });
};

const postCommentToArticle = (req, res) => {
  const { article_id } = req.params;
  const { author, body } = req.body;

  return createCommentToArticle(article_id, author, body).then((comment) => {
    res.status(201).send({ comment: comment[0] });
  });
};

const deleteComment = (req, res) => {
  const { comment_id } = req.params;
  return removeComment(comment_id).then((comment) => {
    res.status(204).send({ comment: comment });
  });
};

module.exports = { getCommentsbyArticleId, postCommentToArticle, deleteComment };
