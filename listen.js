const app = require ('./app')

app.listen(7070,(err)=>{
  if(err){
    console.log(err)
  }
  else console.log('Listening on 7070')
})