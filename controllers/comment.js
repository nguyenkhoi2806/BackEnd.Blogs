const { validationResult } = require("express-validator/check");

const Comment = require("../models/comment");

exports.comment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.description;
    const introduction = req.body.introduction;
    const comment = new Comment({
      title: title,
      content: content,
      introduction: introduction,
      creator: req.userId,
    });
    await comment.save();

    res.status(201).json({
      message: "Post created successfully!",
      post: comment,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const commentId = req.params.postId;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      const error = new Error("Could not find comment.");
      error.statusCode = 404;
      throw error;
    }
    if (comment.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    await Comment.findByIdAndRemove(postId);

    res.status(200).json({ message: "Deleted comment." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
