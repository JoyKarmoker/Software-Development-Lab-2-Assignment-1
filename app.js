const express = require('express')
const app = express()
const port = 3000
const dishRouter = require(__dirname + '/dishRouter');
 
app.use('/dishes', dishRouter);
 
app.get('/', (req, res) => {
  res.send('Welcome to the project')
})

app.listen(port, () => {
  console.log(`Server Started on ${port}`)
})