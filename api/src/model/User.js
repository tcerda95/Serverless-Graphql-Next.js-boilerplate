const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  toJSON: { getters: true },
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
