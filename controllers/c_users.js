const readUsers = require ('../models/m_users')

const users = readUsers()

const geUsers = (req,res)=>{
users.then((body)=>{
  res.status(200).send(({users:body}))
})

}


module.exports = geUsers