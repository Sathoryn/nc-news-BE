const db = require('../db/connection');

function createTopics(){
  return db.query ('SELECT * FROM topics').then(({rows})=>{
    return rows
  })

}

module.exports = createTopics