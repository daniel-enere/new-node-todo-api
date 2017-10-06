const mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    minlength: 7,
    trim: true,
    unique: true,
    required: true
  }
});

module.exports = {User};

// var newUser = new User({
//   email: 'dan@email.com'
// })
//
// newUser.save().then((doc) => {
//   console.log(`${doc} saved`);
// }, (err) => {
//   console.log(`${err} not saved`)
// });
