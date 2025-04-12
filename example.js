const mongoose = require("mongoose");
const BlogPost = require("./schema");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Example: Create a new blog post
async function createBlogPost() {
  try {
    const newPost = new BlogPost({
      title: "My First Blog Post",
      content:
        "This is a sample blog post with more than 50 characters to meet the minimum length requirement.",
      author: "JohnDoe",
      tags: ["tech", "coding"],
      category: "Technology",
    });

    const savedPost = await newPost.save();
    console.log("Blog post created:", savedPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
  }
}

// Example: Add a comment to a blog post
async function addComment(postId) {
  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      console.log("Post not found");
      return;
    }

    post.comments.push({
      username: "JaneDoe",
      message: "Great post! Thanks for sharing.",
    });

    const updatedPost = await post.save();
    console.log("Comment added:", updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

// Example: Like a blog post
async function likePost(postId, username) {
  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      console.log("Post not found");
      return;
    }

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      const updatedPost = await post.save();
      console.log("Post liked:", updatedPost);
    } else {
      console.log("User already liked this post");
    }
  } catch (error) {
    console.error("Error liking post:", error);
  }
}

// Example usage
createBlogPost();
// addComment('post_id_here');
// likePost('post_id_here', 'username');
