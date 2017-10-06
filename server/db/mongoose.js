const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.PORT || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
