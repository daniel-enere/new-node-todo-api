const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp' || process.env.MONGO_URI);

module.exports = {mongoose};
