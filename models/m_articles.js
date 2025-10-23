const db = require('../db/connection');

function readArticles() {
  return db.query('SELECT * FROM articles').then(({ rows }) => {
    return rows;
  });
}

function readArticlesById() {}

module.exports = { readArticles, readArticlesById };
