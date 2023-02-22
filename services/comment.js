const mongoose = require("mongoose");
const Comment = require("../models/comment");
const User = require("../models/user");
const Profile = require("../models/profile");

/**
 *
 * @param {*} commentData
 * @returns
 */
exports.createComment = async (commentData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(commentData.user)) {
      throw new Error("Invalid user ID");
    }

    if (!mongoose.Types.ObjectId.isValid(commentData.profile)) {
      throw new Error("Invalid profile ID");
    }

    const user = await User.findById(commentData.user);
    if (!user) {
      throw new Error("User not found");
    }

    const profile = await Profile.findById(commentData.profile);
    if (!profile) {
      throw new Error("Profile not found");
    }

    const comment = new Comment(commentData);

    const newComment = await comment.save();

    return newComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @returns
 */
exports.getAllComments = async () => {
  try {
    const comments = await Comment.find()
      .populate("user")
      .populate("profile")
      .exec();

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} userId
 * @returns
 */
exports.getCommentsByUserId = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const comments = await Comment.find({ user: userId })
      .populate("user")
      .populate("profile")
      .exec();

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} profileId
 * @returns
 */
exports.getCommentsByProfileId = async (profileId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      throw new Error("Invalid profile ID");
    }

    const comments = await Comment.find({ profile: profileId })
      .populate("user")
      .populate("profile")
      .exec();

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*}
 * @returns
 */
exports.sortCommentsByDate = async () => {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("profile")
      .exec();

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} content
 * @returns
 */
exports.filterCommentsByContent = async (content) => {
  try {
    const comments = await Comment.find({
      content: { $regex: content, $options: "i" },
    })
      .populate("user")
      .populate("profile")
      .exec();

    return comments;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} commentId
 * @param {*} userId
 * @returns
 */
exports.likeComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (comment.likers.includes(userId)) {
      throw new Error("You have already liked this comment");
    }

    comment.likes += 1;
    comment.likers.push(userId);

    const updatedComment = await comment.save();

    return updatedComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} commentId
 * @param {*} userId
 * @returns
 */
exports.unlikeComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!comment.likers.includes(userId)) {
      throw new Error("You have not liked this comment");
    }

    comment.likes -= 1;
    comment.likers = comment.likers.filter(
      (likerId) => likerId.toString() !== userId.toString()
    );

    const updatedComment = await comment.save();

    return updatedComment;
  } catch (error) {
    throw new Error(error.message);
  }
};
