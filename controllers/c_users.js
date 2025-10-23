const readUsers = require('../models/m_users');

const getUsers = (req, res) => {
  readUsers().then((body) => {
    res.status(200).send({ users: body });
  });
};

module.exports = getUsers;
