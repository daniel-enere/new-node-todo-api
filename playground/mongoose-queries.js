const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users');

var id = '59cfebbd6395cb8028d362bb'
var id2 = '69cd2dd7ce419990302ea6c7'

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

if (!ObjectID.isValid(id2)) {
  console.log('ID aint valid fam');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));

User.findById(id2).then((user) =>{
  if(!user) {
    return console.log('User not found')
  }
  console.log('User by ID', user);
});
