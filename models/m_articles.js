const db = require('../db/connection');

function readArticles() {
  return db
    .query('SELECT title, topic, author, created_at, votes,article_img_url, article_id FROM articles ORDER BY created_at DESC')
    .then(({ rows }) => {
      return rows;
    });
}

function readArticlesById() {

}

module.exports = { readArticles, readArticlesById };
