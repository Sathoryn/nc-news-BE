const { readArticles, readArticlesById } = require('../models/m_articles');

const getNoBodyArticles = (req, res) => {
  const { sort_by, order,topic } = req.query;

  readArticles(sort_by, order,topic).then((body) => {
    res.status(200).send({ articles: body });
  });
};

const getArticleById = (req, res) => {};

module.exports = { getNoBodyArticles, getArticleById };
