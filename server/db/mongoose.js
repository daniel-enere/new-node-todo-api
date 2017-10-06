const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
};
mongoose.connect(db.localhost || process.env.MONGO_URI);

module.exports = {mongoose};
