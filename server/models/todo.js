const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports= {Todo};

// var newTodo = new Todo({
//   text: 'Creat multiple apps soon'
// });
//
// newTodo.save().then((doc) => {
//   console.log(`Saved ${doc}`);
// }, (e) => {
//   console.log('Unable to save')
// });

// var nextTodo = new Todo({
//   text: ' s s s s',
//   completed: true,
//   completeAt: 1121
// });
//
// nextTodo.save().then((doc) => {
//   console.log('Saved', doc);
// }, (err) => {
//   console.log('Unable to save', err)
// });
