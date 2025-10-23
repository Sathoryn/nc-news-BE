const { readArticles, readArticlesById } = require('../models/m_articles');

const getNoBodyArticlesByDate = (req, res) => {
  readArticles()
    .then((articles) => {
      const noArticlesRows = articles.map((row) => {
        const newRow = { ...row };
        delete newRow.articles;
        return newRow;
      });
      return noArticlesRows;
    })
    .then((rows) => {
      const sortedByDateRows = rows.sort((articleA, articleB) => {
        return new Date(articleB.created_at) - new Date(articleA.created_at);
      });
      return sortedByDateRows;
    })
    .then((body) => {
      res.status(200).send({ articles: body });
    });
};

const getArticleById = (req, res) => {};

module.exports = { getNoBodyArticlesByDate, getArticleById };
