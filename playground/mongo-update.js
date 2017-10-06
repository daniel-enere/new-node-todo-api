// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59cc10f4e4230236dac92f1b')
  // }, {
  //   $set: {
  //     complete: true,
  //     time: "This sunday after this course"
  //   }, $inc: {
  //
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59cd0821e4230236dac94015')
  }, {
    $set:{
      name: 'Barack Obama',
      location: 'Chicago'
    }, $inc: {
      age: -21
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  // db.close();
});
