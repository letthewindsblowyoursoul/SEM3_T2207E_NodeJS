const express = require('express')
const app = express()
const port = 3000

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views','./src/views')
app.get('/', (req, res) => {
  res.render('homepage.ejs')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})

