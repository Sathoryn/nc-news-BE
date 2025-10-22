const request = require('supertest');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');
const db = require('../db/connection');

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe('get request "/"', () => {
  test('200: responds with "Hello there :)"', () => {
    return request(app).get('/').expect(200);
  });
});

describe('get request "/api/topics"', () => {
  test('200: responds with array of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        expect(topics).toBeInstanceOf(Array);
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.description).toBe('string');
          expect(typeof topic.slug).toBe('string');
          expect(typeof topic.img_url).toBe('string');
        });
      });
  });
});

describe('get request "/api/articles"', () => {
  test('200: responds with array of articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toBeInstanceOf(Array);
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number');
          expect(typeof article.title).toBe('string');
          expect(typeof article.topic).toBe('string');
          expect(typeof article.author).toBe('string');
          expect(typeof article.body).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
        });
      });
  });
});
