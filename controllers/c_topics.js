const createTopics = require('../models/m_topics.js');

const getTopics = (req, res) => {
  createTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
};
module.exports = getTopics;
