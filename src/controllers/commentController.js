const Comment = require("../models/comment");
const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/post");
const validateMongodbId = require("../utils/validateMongodbID");
const commentController = {};

commentController.createComment = expressAsyncHandler(async (req, res) => {
  //get user

  const user = req.user;

  //get postID
  const { postId, description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user: user,
      description: description,
    });

    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send("Error in creating comment");
  }
});

commentController.fetchAllComments = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created");

    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send("Error in fetching all comments");
  }
});

commentController.fetchComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  try {
    const comments = await Comment.findById(id).populate("user", "-password");

    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send("Error in fetching the post comments");
  }
});

commentController.updateComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        user: req.user,
        post: req.body?.postId,
        description: description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send("Error in updating comment");
  }
});

commentController.deleteComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    return res.status(200).send("Comment deleted successfully");
  } catch (error) {
    return res.status(500).send("Error in deleting the comment");
  }
});

module.exports = commentController;
