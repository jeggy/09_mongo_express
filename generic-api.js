/**
 * Created by Jógvan on 29/04-2016 10:19.
 */


module.exports = function(mongodb, mongoUrl){
    var f = {};

    var mongoClient = mongodb.MongoClient;
    var objectID = mongodb.ObjectID;

    f.get = function(collectionName, callback) {
        mongoClient.connect(mongoUrl, function(err, db) {
            var collection = db.collection(collectionName);

            collection.find({}).toArray(function(err, data) {
                callback(err, data);
                db.close();
            });
        });
    };

    f.getById = function (collectionName, id, callback) {
        mongoClient.connect(mongoUrl, function(err, db) {

            var collection = db.collection(collectionName);

            if(objectID.isValid(id)) {
                collection.findOne({_id: objectID(id)}, function (err, data) {
                    callback(err, data);
                    db.close();
                });
            }else{
                callback({Error: "Invalid id"}, null);
                db.close();
            }
        });
    };

    f.postObject = function (collectionName, object, callback) {
        mongoClient.connect(mongoUrl, function (err, db) {
            var collection = db.collection(collectionName);

            collection.insertOne(object, function (err, data) {
                callback(err, data);
                db.close();
            });
        });
    };
    
    f.deleteObject = function (collectionName, id, callback) {
        mongoClient.connect(mongoUrl, function (err, db) {
            
            if(objectID.isValid(id)) {
                db.collection(collectionName).deleteOne({_id : objectID(id)}, function (err, data) {
                    callback(err, data);   
                });
            }else{
                callback({Error: "Invalid id"}, null);
            }
        });
    };

    f.putObject = function (collectionName, id, update, callback) {
        mongoClient.connect(mongoUrl, function (err, db) {
            if(objectID.isValid(id)) {
                db.collection(collectionName).updateOne({_id : objectID(id)}, update, function (err, data) {
                    callback(err, data);
                });
            }else{
                callback({Error: "Invalid id"}, null);
            }
        });
    };

    return f;
};