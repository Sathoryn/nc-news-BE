const db = require('../db/connection');

function readCommentsByArticleId(article_id) {
  return db
    .query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC', [article_id])
    .then(({ rows }) => {
      return rows;
    });
}

function createCommentToArticle(article_id, author, body) {
  return db
    .query(
      `
  INSERT INTO comments 
  (article_id,author,body) 
  VALUES
  ($1,$2,$3) RETURNING *`,
      [article_id, author, body]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function removeComment(comment_id) {
  return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [comment_id]).then(({ rows }) => {
    return rows;
  });
}

module.exports = { readCommentsByArticleId, createCommentToArticle, removeComment };
