var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/clboTest';

app.get('/persons', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('persons');

        collection.find({}).toArray(function(err, data) {
            
            res.send(data);
            db.close();
        });
    });
});

app.listen(3000);
