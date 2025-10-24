const { readArticles, readArticlesById } = require('../models/m_articles');

const getNoBodyArticlesByDate = (req, res) => {
  readArticles().then((body) => {
    res.status(200).send({ articles: body });
  });
};

const getArticleById = (req, res) => {

};

module.exports = { getNoBodyArticlesByDate, getArticleById };
