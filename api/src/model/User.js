const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: { getters: true },
  timestamps: true
});

userSchema.method('token', function() {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET, { expiresIn: '1d' });
});

userSchema.plugin(uniqueValidator);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
