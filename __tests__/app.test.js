const request = require('supertest');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');
const db = require('../db/connection');
const { forEach } = require('../db/data/test-data/articles');

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
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
        });
      });
  });
});

describe('get request "/api/articles/:article_id"', () => {
  test('200: responds with the requested id article', () => {
    return request(app)
      .get('/api/articles/3')
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(article.article_id).toBe(3);
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

describe('get request "/api/users"', () => {
  test('200: responds with array of users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(typeof user.username).toBe('string');
          expect(typeof user.name).toBe('string');
          expect(typeof user.avatar_url).toBe('string');
        });
      });
  });
});

describe('get request "/api/articles/:article_id/comments"', () => {
  test('200: responds with the comments from the requested id article', () => {
    return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments).toBeInstanceOf(Array);
        expect(comments.length).toBe(2);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe('number');
          expect(typeof comment.body).toBe('string');
          expect(typeof comment.article_id).toBe('number');
          expect(typeof comment.author).toBe('string');
          expect(typeof comment.votes).toBe('number');
          expect(typeof comment.created_at).toBe('string');
        });
      });
  });
});

describe('post request "/api/articles/:article_id/comments"', () => {
  test('201: responds with the posted comment', () => {
    const newComment = { author: 'lurker', body: 'Lurker has posted a test comment' };
    return request(app)
      .post('/api/articles/3/comments')
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const comment = body.comment;
        expect(typeof comment.comment_id).toBe('number');
        expect(comment.body).toBe('Lurker has posted a test comment');
        expect(typeof comment.article_id).toBe('number');
        expect(comment.author).toBe('lurker');
        expect(typeof comment.votes).toBe('number');
        expect(typeof comment.created_at).toBe('string');
      });
  });
});

describe('put request "/api/articles/:article_id"', () => {
  test('200: responds with the patched article', () => {
    const increaseVotes = { increaseVotes: 77 };

    return request(app)
      .put('/api/articles/3')
      .send(increaseVotes)
      .expect(200)
      .then(({ body }) => {
        const article = body.updatedArticle
        expect(article.article_id).toBe(3);
        expect(typeof article.title).toBe('string');
        expect(typeof article.topic).toBe('string');
        expect(typeof article.author).toBe('string');
        expect(typeof article.body).toBe('string');
        expect(typeof article.created_at).toBe('string');
        expect(article.votes).toBe(77);
        expect(typeof article.article_img_url).toBe('string');
      });
  });
});
