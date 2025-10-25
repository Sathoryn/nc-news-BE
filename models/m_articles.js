const db = require('../db/connection');

function readArticles(sort_by = 'created_at', order = 'DESC', topic = 'all') {
  const validSort = ['created_at', 'votes'];
  const validOrder = ['ASC', 'DESC'];
  const validTopic = ['mitch', 'cats', 'paper', 'all'];

  // if(!validSort.includes(sort_by) || !validOrder.includes(order) || !validTopic.includes(topic)){
  //   return Promise.reject({status:400, msg:'Bad request'})
  // }

  let query = `SELECT title, topic, author, created_at, votes,article_img_url, article_id FROM articles `;

  if (topic !== 'all') {
    query += `WHERE topic = '${topic}' `;
  }

  return db.query(query + `ORDER BY ${sort_by} ${order}`).then(({ rows }) => {
    return rows;
  });
}

function readArticlesById(article_id) {
  return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then(({ rows }) => {
    return rows;
  });
}

function updateArticleVotes(increaseVotes, article_id) {
  return db
    .query(
      `
    UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`,
      [increaseVotes, article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { readArticles, readArticlesById, updateArticleVotes };
