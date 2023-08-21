var express = require('express'),
    app     = express,
    port    = 8080,
    MongoClient = require('mongodb').MongoClient;

app.use(express.bodyPaser)
