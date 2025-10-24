const readTopics = require('../models/m_topics.js');

const getTopics = (req, res) => {
  readTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
};
module.exports = getTopics;
