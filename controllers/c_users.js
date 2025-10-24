const readUsers = require('../models/m_users');

const getUsers = (req, res) => {
  readUsers().then((users) => {
    res.status(200).send({ users: users });
  });
};

module.exports = getUsers;
