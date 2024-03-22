import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { userId, caseStudyId, content } = req.body;

    // Validate userId and caseStudyId existence before creating a comment
    const userExists = await User.findById(userId);
    const caseStudyExists = await CaseStudy.findById(caseStudyId);

    if (!userExists || !caseStudyExists) {
      return res.status(404).json({ error: "User or CaseStudy not found" });
    }

    const newComment = new Comment({
      userId,
      caseStudyId,
      content,
    });

    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get comments with profile pictures for a given caseStudyId
export const getCommentsWithProfilePictures = async (req, res) => {
  const { caseStudyId } = req.params;

  try {
    // Find all comments for the given caseStudyId
    const comments = await Comment.find({ caseStudyId })
      .populate({
        path: "userId",
        model: "User",
        select: "profilePicture", // Select only the profilePicture field from the User model
      })
      .exec();

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a comment by ID
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
