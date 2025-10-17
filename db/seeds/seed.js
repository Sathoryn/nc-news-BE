const db = require('../connection');
const format = require('pg-format');
const { convertTimestampToDate, formatData, getIdAndCompareValue, feedIdFromCompareValue } = require('./utils');

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments, articles, users, topics`)
    .then((result) => {
      return db.query(`
      CREATE TABLE topics(
        description VARCHAR (50),
        slug VARCHAR (50) PRIMARY KEY,
        img_url VARCHAR (1000)
      );`);
    })
    .then((result) => {
      const formatedTopics = formatData(topicData);
      const insertTopicsData = format(
        `
      INSERT INTO topics
      (description, slug, img_url)
      VALUES %L;`,
        formatedTopics
      );
      return db.query(insertTopicsData);
    })
    .then((result) => {
      return db.query(`
      CREATE TABLE users(
        username VARCHAR PRIMARY KEY,
        name VARCHAR (50),
        avatar_url VARCHAR (1000)
      );`);
    })
    .then((result) => {
      const formatedUsers = formatData(userData);
      const insertUsersData = format(
        `
        INSERT INTO users
        (username, name, avatar_url)
        VALUES %L;`,
        formatedUsers
      );
      return db.query(insertUsersData);
    })
    .then((result) => {
      return db.query(
        `
      CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR (100),
        author VARCHAR (50) REFERENCES users(username),
        topic VARCHAR (50) REFERENCES topics(slug),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
      );`
      );
    })
    .then((result) => {
      return db.query(`
      CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        body TEXT,
        article_id INT REFERENCES articles(article_id),
        author VARCHAR (50) REFERENCES users(username),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
    })
    .then((result) => {
      const convertedDate = articleData.map(convertTimestampToDate);
      const formatedArticles = formatData(convertedDate);
      const insertArticlesData = format(
        `
        INSERT INTO articles
        (created_at, title, topic, author,  body,  votes, article_img_url)
        VALUES %L RETURNING *;`,
        formatedArticles
      );
      return db.query(insertArticlesData);
    })
    .then((articleData) => {
      const articleId = getIdAndCompareValue(articleData.rows, 'article_id', 'title');
      const updatedcomments = feedIdFromCompareValue(articleId, commentData, 'article_title', 'article_id');

      const convertedDate = updatedcomments.map(convertTimestampToDate);
      const formatedComments = formatData(convertedDate);
      console.log(formatedComments);
      const insertCommentsData = format(
        `INSERT INTO comments
        (created_at, body, votes, author, article_id)
        VALUES %L RETURNING *;`,
        formatedComments
      );
      return db.query(insertCommentsData);
    });
};

module.exports = seed;
