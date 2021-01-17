const { validationResult } = require("express-validator/check");

const Comment = require("../models/comment");
const Post = require("../models/post");

exports.comment = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const content = req.body.content;
    const comment = new Comment({
      content: content,
      postId: postId,
      creator: req.userId,
    });
    await comment.save();
    const post = await Post.findById(postId);
    post.comments.push(comment);
    await post.save();
    res.status(201).json({
      message: "Post created successfully!",
      comment: comment,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
