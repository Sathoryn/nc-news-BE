const readArticles = require('../models/m_articles');

const articles = readArticles();

const getArticles = (req, res) => {
  articles.then((body) => {
    res.status(200).send({ articles: body });
  });
};

module.exports = getArticles;
