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

describe('GET request "/"', () => {
  test('200: responds with "Hello there :)"', () => {
    return request(app).get('/').expect(200);
  });
});

describe('GET request "/api/topics"', () => {
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

describe('GET request "/api/articles"', () => {
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
  test('200: defaults sorting by created_at in descending order', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;

        const testArticles = JSON.parse(JSON.stringify(articles));

        const sortedByDateRows = testArticles.sort((articleA, articleB) => {
          return new Date(articleB.created_at) - new Date(articleA.created_at);
        });
        expect(articles).toEqual(sortedByDateRows);
      });
  });
  test('200: sorts by votes in ascending order', () => {
    return request(app)
      .get('/api/articles?sort_by=votes&order=ASC')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        const testArticles = JSON.parse(JSON.stringify(articles));

        const sortedByDateRows = testArticles.sort((articleA, articleB) => {
          articleA.votes - articleB.votes;
        });
        expect(articles).toEqual(sortedByDateRows);
      });
  });
  test('200: responds with only the queried articles, default sorting by created_at in descending order', () => {
    return request(app)
      .get('/api/articles?topic=cats')
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        const testArticles = JSON.parse(JSON.stringify(articles));

        const sortedByDateRows = testArticles.sort((articleA, articleB) => {
          return new Date(articleB.created_at) - new Date(articleA.created_at);
        });
        expect(articles).toEqual(sortedByDateRows);
        expect(articles).toEqual([
          {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            created_at: '2020-08-03T13:14:00.000Z',
            votes: 0,
            article_img_url:
              'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            article_id: 5,
          },
        ]);
      });
  });
  test('400: responds with bad request message', () => {
    return request(app)
      .get('/api/articles?sort_by=votes&order=invalid_order&?topic=cats')
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Bad request.');
      });
  });
});

describe('GET request "/api/users"', () => {
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

describe('GET request "/api/articles/:article_id"', () => {
  test('200: responds with the requested article', () => {
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
  test('200: responds with the requested id article and includes the amount of comments related to that article', () => {
    return request(app)
      .get('/api/articles/3?comments=true')
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
  test('400: responds with bad request message', () => {
    return request(app)
      .get('/api/articles/not_an_article')
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Bad request.');
      });
  });
  test('404: responds with not found request message', () => {
    return request(app)
      .get('/api/articles/777')
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Article_id not found.');
      });
  });
});

describe('GET request "/api/articles/:article_id/comments"', () => {
  test('200: responds with the comments from the requested article', () => {
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
  test('200: defaults sorting by created_at in descending order', () => {
    return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        const testComments = JSON.parse(JSON.stringify(comments));

        const sortedByDateRows = testComments.sort((commentA, commentB) => {
          return new Date(commentB.created_at) - new Date(commentA.created_at);
        });
        expect(comments).toEqual(sortedByDateRows);
      });
  });
  test('400: responds with bad request message if bad article-id', () => {
    return request(app)
      .get('/api/articles/not_an_article/comments')
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('Bad request.');
      });
  });
  test('404: responds with not found request message', () => {
    return request(app)
      .get('/api/articles/777/comments')
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe('There are no comments in this article.');
      });
  });
});

describe('POST request "/api/articles/:article_id/comments"', () => {
  test('201: responds with the a newly posted comment in specified article', () => {
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

describe('PUT request "/api/articles/:article_id"', () => {
  test('200: responds with the patched article increasing the number of votes', () => {
    const increaseVotes = { increaseVotes: 77 };

    return request(app)
      .put('/api/articles/3')
      .send(increaseVotes)
      .expect(200)
      .then(({ body }) => {
        const article = body.updatedArticle;
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

describe('DELETE request "/api/comments/:comment_id"', () => {
  test('204: responds with an empty object representing the deleted comment', () => {
    return request(app)
      .delete('/api/comments/11')
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
});
