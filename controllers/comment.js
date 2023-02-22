const CommentService = require("../services/comment");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createComment = async (req, res) => {
  try {
    const { user, profile, content } = req.body;

    if (!user || !profile || !content) {
      throw new Error(`Invalid request payload`);
    }

    const comment = await CommentService.createComment({
      user: user,
      profile: profile,
      content: content,
    });
    return res.status(201).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getAllComments = async (req, res) => {
  try {
    const comments = await CommentService.getAllComments();

    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getCommentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const comments = await CommentService.getCommentsByUserId(userId);

    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getCommentsByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;

    const comments = await CommentService.getCommentsByProfileId(profileId);

    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.sortCommentsByDate = async (req, res) => {
  try {
    const comments = await CommentService.sortCommentsByDate();

    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.filterCommentsByContent = async (req, res) => {
  try {
    const { content } = req.query;

    const comments = await CommentService.filterCommentsByContent(content);

    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.likeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    const updatedComment = await CommentService.likeComment(commentId, userId);

    return res.status(200).json({ data: updatedComment });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.unlikeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    const updatedComment = await CommentService.unlikeComment(
      commentId,
      userId
    );

    return res.status(200).json({ data: updatedComment });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
