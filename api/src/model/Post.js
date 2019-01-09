const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    toJSON: { getters: true },
    timestamps: true
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
