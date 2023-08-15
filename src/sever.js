require('dotenv').config();
const express = require('express');//commonjs
const app = express();//app express
const port = process.env.PORT || 8888;//port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;
const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');

// config template engine
configViewEngine(app);

//khai bao route
app.use('/',webRouter);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})