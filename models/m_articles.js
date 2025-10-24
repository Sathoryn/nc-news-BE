const db = require('../db/connection');

function readArticles(sort_by = 'created_at', order = 'DESC', topic = 'all') {
  const validSort = ['created_at', 'votes'];
  const validOrder = ['ASC', 'DESC'];
  const validTopic = ['mitch', 'cats', 'paper', 'all'];


  let query = `SELECT title, topic, author, created_at, votes,article_img_url, article_id FROM articles `;

  if (topic !== 'all') {;
    query += `WHERE topic = '${topic}' `
  }

  return db.query(query + `ORDER BY ${sort_by} ${order}`).then(({ rows }) => {
    return rows;
  });
}

function readArticlesById() {}

module.exports = { readArticles, readArticlesById };
