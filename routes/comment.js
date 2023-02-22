"use strict";

const express = require("express");
const commentRouter = express.Router();
const CommentController = require("../controllers/comment");

// Get all comments
commentRouter.get("/", CommentController.getAllComments);

// Get comments by user ID
commentRouter.get("/user/:userId", CommentController.getCommentsByUserId);

// Get comments by profile ID
commentRouter.get(
  "/profile/:profileId",
  CommentController.getCommentsByProfileId
);

// Get comments sorted by date
commentRouter.get("/sort/date", CommentController.sortCommentsByDate);

// Filter comments by content
commentRouter.get(
  "/filter-by-content",
  CommentController.filterCommentsByContent
);

// Create a new comment
commentRouter.post("/", CommentController.createComment);

// Like a comment
commentRouter.put("/like", CommentController.likeComment);

// Unlike a comment
commentRouter.put("/unlike", CommentController.unlikeComment);

module.exports = commentRouter;
