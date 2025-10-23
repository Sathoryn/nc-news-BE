const readTopics = require('../models/m_topics.js');

const getTopics = (req, res) => {
  readTopics().then((body) => {
    res.status(200).send({ topics: body });
  });
};
module.exports = getTopics;
