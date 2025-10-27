const { readArticles, readArticlesById, updateArticleVotes } = require('../models/m_articles');

const getNoBodyArticles = (req, res) => {
  const { sort_by, order, topic } = req.query;

  return readArticles(sort_by, order, topic).then((articles) => {
    res.status(200).send({ articles: articles });
  });
};

const getArticleById = (req, res) => {
  const { article_id } = req.params;
  return readArticlesById(article_id).then((article) => {
    res.status(200).send({ article: article[0] });
  });
};

const putArticleVotes = (req, res) => {
  const { increaseVotes } = req.body;
  const { article_id } = req.params;

  updateArticleVotes(increaseVotes, article_id).then((rows) => {
    res.status(200).send({ updatedArticle: rows[0] });
  });
};

module.exports = { getNoBodyArticles, getArticleById, putArticleVotes };
