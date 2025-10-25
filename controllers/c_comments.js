const { readCommentsByArticleId } = require('../models/m_comments');

const getCommentsbyArticleId = (req, res) => {
  const { article_id } = req.params;

  readCommentsByArticleId(article_id).then((comments) => {
    res.status(200).send({ comments: comments });
  });
};

module.exports = { getCommentsbyArticleId };
