const mongoose = require("mongoose");

// Define the comment schema as a subdocument
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the blog post schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: "General",
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
blogPostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the BlogPost model
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
