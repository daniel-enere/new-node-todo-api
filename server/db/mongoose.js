const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI);


// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';
// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
//
//   db.close();
// });

module.exports = {mongoose};
// {MongoClient}
// process.env.NODE_ENV === 'test'
