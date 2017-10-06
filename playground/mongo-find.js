// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('59cc10f4e4230236dac92f1b')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });
  db.collection('Users').find({name: 'Chad'}).count().then((count) => {
    console.log(`Users count: ${count}`);
  }, (err) => {
    console.log('Unable to find Todos documents', err);
  });

  db.collection('Users').find({name: 'Chad'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs,undefined, 2));
  }, (err) => {
    console.log('Unable to find Todos documents', err);
  });

  // db.close();
});
