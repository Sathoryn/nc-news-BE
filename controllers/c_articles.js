const readArticles = require('../models/m_articles');

const getArticles = (req, res) => {
  readArticles().then((body) => {
    res.status(200).send({ articles: body });
  });
};

module.exports = getArticles;
