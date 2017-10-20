const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} =require('./../../models/users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'daniel@email.com',
  password: 'OnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'Ife@gmail.com',
  password: 'TwoPass'
}];


const todos = [{
  _id: new ObjectID(),
  text: 'Test todo 1'
}, {
  _id: new ObjectID(),
  text: 'Test todo 2',
  completed: true,
  completedAt:1234
}];

const popTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const popUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};
module.exports = {todos, popTodos, popUsers, users};
