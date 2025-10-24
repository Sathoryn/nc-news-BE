const db = require('../db/connection');

function readArticles(sort_by='created_at',order='DESC') {
  const validSort = ['created_at','votes']
  const validOrder = ['ASC','DESC']

  if(validSort.includes(sort_by) || validOrder.includes(order))
  return db
    .query(
      `SELECT title, topic, author, created_at, votes,article_img_url, article_id FROM articles ORDER BY ${sort_by} ${order}`
    )
    .then(({ rows }) => {
      return rows;
    });
}

function readArticlesById() {}

module.exports = { readArticles, readArticlesById };
