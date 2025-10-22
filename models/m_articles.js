const db = require('../db/connection');

function readArtciles() {
  return db.query('SELECT * FROM articles').then(({ rows }) => {
    return rows;
  });
}

module.exports = readArtciles;
