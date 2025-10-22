const db = require('../db/connection');

function readArtciles() {
  return db
    .query('SELECT * FROM articles')
    .then(({ rows }) => {
      const noBodyRows = rows.map((row) => {
        const newRow = { ...row };
        delete newRow.body;
        return newRow;
      });
      return noBodyRows;
    })
    .then((rows) => {
      const newRows = rows.sort((articleA, articleB) => {
        return new Date(articleA.created_at) - new Date(articleB.created_at);
      });
      return newRows;
    });
}

module.exports = readArtciles;
