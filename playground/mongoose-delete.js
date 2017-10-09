const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findONeAndRemove()

Todo.findByIdAndRemove('59dadb52882ca35d721bbcd8').then((todo) => {
  console.log(todo);
});
// .catch((e) => {
//    console.log(e);
// });
