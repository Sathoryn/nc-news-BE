const { readArticles, readArticlesById } = require('../models/m_articles');

const getNoBodyArticlesByDate = (req, res) => {
  const { sort_by, order } = req.query;

  readArticles(sort_by, order).then((body) => {
    res.status(200).send({ articles: body });
  });
};

const getArticleById = (req, res) => {};

module.exports = { getNoBodyArticlesByDate, getArticleById };
