// Express
var express = require('express');
var app = express();

// Mongodb
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var objectID = mongodb.ObjectID;
var url = 'mongodb://localhost:27017/api_exercise';

// Request body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Generic API
var genericApi = require('./generic-api')(mongodb, url);


var apis = ["user", "product", "order"];

for(var i = 0; i<apis.length; i++) {
    var api = apis[i];
    console.log(api);
    app.get(`/${api}`, function (req, res) {
        genericApi.get(api, function (err, data) {
            res.send(data);
        });
    });

    app.get(`/${api}/:id`, function (req, res) {
        genericApi.getById(api, req.params.id, function (err, data) {
            res.send(data);
        });
    });

    app.post(`/${api}`, function (req, res) {
        genericApi.postObject(api, req.body, function () {
            res.status(200);
            res.send();
        });
    });

    app.delete(`/${api}`, function (req, res) {
        genericApi.deleteObject(api, req.body._id, function (err, data) {
            res.status(err == null ? 400 : 200);
            res.send();
        });
    });

    /**
     *  Example PUT:
     *  {
 *      "where": {
 *          "_id": "5723138cf81d4aeb48dbb235"
 *      },
 *      "set": {
 *          "$set": {
 *              "username":" Fancy"
 *          }
 *      }
 *  }
     */
    app.put(`/${api}`, function (req, res) {
        genericApi.putObject(api, req.body.where._id, req.body.set, function (err, data) {
            res.status(err == null ? 400 : 200);
            res.send();
        });
    });
}




app.listen(3000);
