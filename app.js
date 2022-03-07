const express = require('express')
const app = express()
const port = 3000
const dishRouter = require(__dirname + '/dishRouter');
const promoRouter = require(__dirname + '/promoRouter');
const leaderRouter = require(__dirname + '/leaderRouter');
 
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
 
app.get('/', (req, res) => {
  res.send('Welcome to the project')
})

app.listen(port, () => {
  console.log(`Server Started on ${port}`)
})