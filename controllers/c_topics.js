const readTopics = require('../models/m_topics.js');

const topics = readTopics()

const getTopics = (req, res) => {
  topics.then((body) => {
    res.status(200).send({ topics: body });
  });
};
module.exports = getTopics;
